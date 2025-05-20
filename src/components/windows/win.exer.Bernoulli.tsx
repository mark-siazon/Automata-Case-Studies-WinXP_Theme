// src/components/home/Window/BernoulliWindow.tsx
import React, { useState } from "react";
import Window from "../home/Window";

interface BernoulliWindowProps {
  id: string;
  onClose: () => void;
}

// Calculate Bernoulli numbers using Akiyama–Tanigawa algorithm
function generateBernoulli(n: number): string[] {
  const A: number[][] = [];
  const result: string[] = [];
  for (let m = 0; m < n; m++) {
    A[m] = [];
    for (let j = 0; j <= m; j++) {
      if (j === 0) {
        A[m][j] = 1 / (m + 1);
      } else {
        A[m][j] = (A[m][j - 1] * (m - j + 1)) / (j + 1);
      }
    }
    let Bm = A[m][m];
    for (let k = m - 1; k >= 0; k--) {
      Bm -= A[m][k];
    }
    // Format as fraction if possible, else as decimal
    result.push(Bm === 0 ? "0" : Bm.toPrecision(8).replace(/\.?0+$/, ""));
  }
  return result;
}

const BernoulliWindow: React.FC<BernoulliWindowProps> = ({ id, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleGenerate = (): void => {
    const n = parseInt(input || "0", 10);
    if (n < 1 || n > 30) {
      setResult("Please enter a number between 1 and 30");
      return;
    }
    const bernoullis = generateBernoulli(n)
      .map((val, idx) => `B_${idx} = ${val}`)
      .join(", ");
    setResult(bernoullis);
  };

  return (
    <Window
      title="Bernoulli Numbers Generator"
      id={id}
      canMinimize
      canMaximize
      canClose
    >
      <div className="p-6 w-full">
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter number of Bernoulli numbers:
              </label>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                min={1}
                max={30}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a number (1-30)"
              />
            </div>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-gradient-to-b from-[#245edc] to-[#4ea3f7] text-white rounded-md hover:brightness-110 transition-all shadow-md"
            >
              Generate
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Bernoulli Numbers:
            </h2>
            <div className="bg-white p-4 rounded-md border border-gray-200 min-h-[100px] font-mono text-sm">
              {result}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default BernoulliWindow;