// src/components/home/Window/TitleWindow.tsx
import React from "react";
import Window from "../home/Window.tsx";

const TitleWindow: React.FC = () => (
  <Window
    title="Case Study Compilation"
    id="title-window"
    taskbarLabel="Case Study"
    canMinimize={false}
    canMaximize={false}
    canClose
  >
    <div className="my-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#0054e3]">
        Case Study Compilation
      </h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1e4eb3]">
        AUTOMATA Theory
      </h2>
      <p className="text-sm sm:text-base text-[#2c3e50]">
        Submitted to:{" "}
        <strong className="font-semibold">Prof. Lester Diampoc</strong>
      </p>
    </div>
  </Window>
);

export default TitleWindow;
