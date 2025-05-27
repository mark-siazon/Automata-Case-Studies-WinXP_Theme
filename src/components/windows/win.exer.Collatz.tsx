// src/components/home/Window/CollatzWindow.tsx
import React, { useState } from "react";
import Window from "../home/Window";

interface CollatzWindowProps {
  id: string;
  onClose: () => void;
}

// Generate Collatz sequence for a given number
function generateCollatz(n: number): number[] {
  const sequence: number[] = [];
  let current = n;
  while (current > 1) {
    sequence.push(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
  }
  sequence.push(1);
  return sequence;
}

const CollatzWindow: React.FC<CollatzWindowProps> = ({ id, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  const handleGenerate = (): void => {
    const n = parseInt(input || "0", 10);
    if (isNaN(n) || n < 1 || n > 1000000 || n % 2 === 0) {
      setError("Please enter a positive odd integer between 1 and 1,000,000");
      setResult([]);
      return;
    }
    setError("");
    setResult(generateCollatz(n));
  };

  return (
    <Window
      title="Collatz Sequence Generator"
      id={id}
      taskbarLabel="Collatz"
      canMinimize
      canMaximize
      canClose
    >
      <div className="p-6 w-full">
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter an odd number:
              </label>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                min={1}
                max={1000000}
                step={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a positive odd integer"
              />
            </div>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-gradient-to-b from-[#245edc] to-[#4ea3f7] text-white rounded-md hover:brightness-110 transition-all shadow-md"
            >
              Generate
            </button>
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center justify-between">
              <span>Collatz Sequence:</span>
              {result.length > 0 && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  Length: {result.length}
                </span>
              )}
            </h2>
            <div className="bg-white p-4 rounded-md border border-gray-200 min-h-[100px] font-mono text-sm overflow-x-auto">
              {result.length > 0 ? result.join(", ") : ""}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default CollatzWindow;
