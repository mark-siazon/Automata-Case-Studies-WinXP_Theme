// src/components/home/Window.tsx
import React, { useRef, useEffect } from "react";
import { WindowManager } from "./windowManager";
import closeWindowIcon from "../../assets/win.Close.Icon.svg?url";
import maximizeWindowIcon from "../../assets/win.Maximize.Icon.svg?url";
import minimizeWindowIcon from "../../assets/win.Minimize.Icon.svg?url";

export type WindowProps = {
  title: string;
  id: string;
  taskbarLabel?: string;
  canMinimize?: boolean;
  canMaximize?: boolean;
  canClose?: boolean;
  children?: React.ReactNode;
  onMinimize?: () => void;
  onMaximize?: (isMaximized: boolean) => void;
  onClose?: () => void;
};

const Window: React.FC<WindowProps> = ({
  title,
  id,
  taskbarLabel,
  canMinimize = true,
  canMaximize = true,
  canClose = true,
  children,
  onMinimize,
  onMaximize,
  onClose,
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
      wm.initWindow(id, taskbarLabel);
    }

    const onResize = () => wm.updateSnapPoints();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [id, taskbarLabel]);

  const minimize = () => {
    windowRef.current?.classList.add("minimized");
    if (onMinimize) onMinimize();
  };
  const maximize = () => {
    if (windowRef.current && wmRef.current) {
      wmRef.current.toggleMaximize(windowRef.current);
      const isMaximized = windowRef.current.classList.contains("maximized");
      if (onMaximize) onMaximize(isMaximized);
    } else {
      if (onMaximize) onMaximize(false);
    }
  };
  const closeWindow = () => {
    windowRef.current?.classList.add("hidden");
    if (onClose) onClose();
  };

  return (
    <section
      ref={windowRef}
      id={id}
      tabIndex={-1}
      className={
        "flex flex-col justify-start items-center text-center w-full " +
        "bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-2 border-[#0054e3] " +
        "shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out"
      }
    >
      <div
        className={
          "w-full h-7 md:h-6 bg-gradient-to-r from-[#0054e3] to-[#3a7ee8] -mx-4 sm:-mx-8 " +
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
              <img
                src={minimizeWindowIcon}
                alt="Minimize window"
                className="block"
              />
            </button>
          )}
          {canMaximize && (
            <button
              onClick={maximize}
              className="maximize-btn cursor-pointer w-4 h-4 flex items-center justify-center bg-gradient-to-b from-[#b5d3f3] to-[#b5d3f3] border border-[#3a6ea5] rounded-[2px] shadow-inner active:translate-y-px"
            >
              <img
                src={maximizeWindowIcon}
                alt="Maximize window"
                className="block"
              />
            </button>
          )}
          {canClose && (
            <button
              onClick={closeWindow}
              className="close-btn cursor-pointer w-4 h-4 flex items-center justify-center bg-gradient-to-b from-[#ffa1a1] to-[#e35d5b] border border-[#a80000] rounded-[2px] shadow-inner active:translate-y-px"
            >
              <img src={closeWindowIcon} alt="Close window" className="block" />
            </button>
          )}
        </div>
      </div>
      {children}
    </section>
  );
};

export default Window;
