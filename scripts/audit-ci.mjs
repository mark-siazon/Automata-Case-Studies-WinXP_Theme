import { execSync } from 'node:child_process';

/**
 * High and critical advisories fail CI.
 * GHSA-ch52-4w7c-c8xp (http-cache-semantics) is pulled in by Astro and
 * @astrojs/vercel. npm's only offered fix downgrades the Vercel adapter to
 * 3.8.1, which cannot run this Astro 7 site. New highs still fail the build,
 * including on Dependabot pull requests.
 */
const ALLOWED = new Set(['GHSA-ch52-4w7c-c8xp']);

function loadAudit() {
  try {
    return JSON.parse(
      execSync('npm audit --json', {
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
      }),
    );
  } catch (error) {
    const stdout = error.stdout?.toString?.() ?? error.stdout;
    if (stdout) return JSON.parse(stdout);
    throw error;
  }
}

const report = loadAudit();

function advisoryIds(name, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const entry = report.vulnerabilities?.[name];
  if (!entry) return [];
  const ids = [];
  for (const via of entry.via ?? []) {
    if (typeof via === 'string') {
      ids.push(...advisoryIds(via, seen));
    } else if (via && typeof via.url === 'string') {
      const id = via.url.split('/').pop();
      if (id) ids.push(id);
    }
  }
  return ids;
}

const blocking = [];
const waived = [];

for (const [name, entry] of Object.entries(report.vulnerabilities ?? {})) {
  if (entry.severity !== 'high' && entry.severity !== 'critical') continue;
  const ids = [...new Set(advisoryIds(name))];
  if (ids.length > 0 && ids.every((id) => ALLOWED.has(id))) {
    waived.push({ name, ids });
  } else {
    blocking.push({ name, severity: entry.severity, ids });
  }
}

for (const item of waived) {
  console.log(`audit-ci: waived ${item.name} (${item.ids.join(', ')})`);
}

if (blocking.length > 0) {
  console.error('audit-ci: blocking high or critical advisories:');
  for (const item of blocking) {
    console.error(`  - ${item.name} | ${item.severity} | ${item.ids.join(', ') || 'unresolved'}`);
  }
  process.exit(1);
}

console.log(`audit-ci: ok — ${waived.length} waived high finding(s), none blocking.`);
