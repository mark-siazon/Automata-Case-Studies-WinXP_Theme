import { useState } from "react";

export default function ReactComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        React Component
      </h2>      <p className="text-gray-600 mb-4">
        This component demonstrates React with Tailwind CSS styling inside an
        Astro project.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Decrease
        </button>
        <span className="text-xl font-bold">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Increase
        </button>
      </div>
    </div>
  );
}
