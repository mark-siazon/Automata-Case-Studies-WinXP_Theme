// src/components/home/Window.tsx
import React, { useRef, useEffect } from "react";
import { WindowManager } from "./windowManager";

export type WindowProps = {
  title: string;
  id: string;
  canMinimize?: boolean;
  canMaximize?: boolean;
  canClose?: boolean;
  children?: React.ReactNode;
};

const Window: React.FC<WindowProps> = ({
  title,
  id,
  canMinimize = true,
  canMaximize = true,
  canClose = true,
  children,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const wmRef = useRef<WindowManager | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!wmRef.current) {
      wmRef.current = new WindowManager();
      (window as any).windowManager = wmRef.current;
    }
    const wm = wmRef.current;

    if (windowRef.current) {
      wm.initWindow(id);
    }

    const onResize = () => wm.updateSnapPoints();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [id]);

  const minimize = () => windowRef.current?.classList.add("minimized");
  const maximize = () =>
    windowRef.current && wmRef.current?.toggleMaximize(windowRef.current);
  const closeWindow = () => windowRef.current?.classList.add("hidden");

  return (
    <section
      ref={windowRef}
      id={id}
      tabIndex={-1}
      className={
        "flex flex-col justify-start items-center gap-3 text-center py-4 sm:py-8 w-full " +
        "bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-2 border-[#0054e3] " +
        "shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out"
      }
    >
      <div
        className={
          "w-full h-6 bg-gradient-to-r from-[#0054e3] to-[#3a7ee8] -mt-4 sm:-mt-8 -mx-4 sm:-mx-8 mb-4 " +
          "flex items-center px-2 justify-between cursor-move"
        }
      >
        <span className="text-white text-sm ml-2 font-medium">{title}</span>
        <div className="flex gap-1 ml-auto">
          {canMinimize && (
            <button
              onClick={minimize}
              className="minimize-btn cursor-pointer w-4 h-4 flex items-center justify-center bg-gradient-to-b from-[#b5d3f3] to-[#b5d3f3] border border-[#3a6ea5] rounded-[2px] shadow-inner active:translate-y-px"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="block"
                fill="none"
              >
                <rect x="3" y="10" width="8" height="2" rx="1" fill="#245edc" />
                <rect
                  x="3"
                  y="10"
                  width="8"
                  height="2"
                  rx="1"
                  stroke="#245edc"
                  stroke-width="0.5"
                />
              </svg>
            </button>
          )}
          {canMaximize && (
            <button
              onClick={maximize}
              className="maximize-btn cursor-pointer w-4 h-4 flex items-center justify-center bg-gradient-to-b from-[#b5d3f3] to-[#b5d3f3] border border-[#3a6ea5] rounded-[2px] shadow-inner active:translate-y-px"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="block"
                fill="none"
              >
                <rect
                  x="3"
                  y="3"
                  width="8"
                  height="8"
                  rx="1"
                  fill="none"
                  stroke="#245edc"
                  stroke-width="1"
                />
              </svg>
            </button>
          )}
          {canClose && (
            <button
              onClick={closeWindow}
              className="close-btn cursor-pointer w-4 h-4 flex items-center justify-center bg-gradient-to-b from-[#ffa1a1] to-[#e35d5b] border border-[#a80000] rounded-[2px] shadow-inner active:translate-y-px"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="block"
                fill="none"
              >
                <line
                  x1="4"
                  y1="4"
                  x2="10"
                  y2="10"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <line
                  x1="10"
                  y1="4"
                  x2="4"
                  y2="10"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {children}
    </section>
  );
};

export default Window;
