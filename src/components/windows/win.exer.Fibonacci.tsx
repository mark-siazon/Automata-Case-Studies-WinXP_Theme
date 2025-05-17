// src/components/home/Window/FibonacciWindow.tsx
import React, { useState } from "react";
import Window from "../home/Window";

interface FibonacciWindowProps {
  id: string;
  onClose: () => void;
}

const FibonacciWindow: React.FC<FibonacciWindowProps> = ({ id, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const generateFibonacci = (n: number): number[] => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
  };

  const handleGenerate = (): void => {
    const n = parseInt(input || "0", 10);
    if (n < 1 || n > 100) {
      setResult("Please enter a number between 1 and 100");
      return;
    }
    setResult(generateFibonacci(n).join(", "));
  };

  return (
    <Window
      title="Fibonacci Sequence Generator"
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
                Enter number of terms:
              </label>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                min={1}
                max={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a number (1-100)"
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
              Sequence:
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

export default FibonacciWindow;
