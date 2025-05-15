// Window state interface
interface WindowState {
  isDragging: boolean;
  currentX: number;
  currentY: number;
  initialX: number;
  initialY: number;
  xOffset: number;
  yOffset: number;
  isMinimized: boolean;
  originalTransform: string;
  originalOpacity: string;
  windowId: string;
  title: string;
  wasMaximized: boolean;
}

// Window snapping configuration
interface SnapConfig {
  threshold: number;
  snapPoints: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export class WindowManager {
  private maxZIndex: number = 100;
  private snapConfig: SnapConfig = {
    threshold: 20, // pixels from edge to trigger snap
    snapPoints: {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth,
    },
  };
  private minimizedWindows: Map<string, WindowState> = new Map();

  // Initialize window dragging and controls
  public initWindow(windowId: string): void {
    const window = document.getElementById(windowId);
    const titleBar = window?.querySelector(".bg-gradient-to-r");
    if (!window || !titleBar) return;

    const state: WindowState = {
      isDragging: false,
      currentX: 0,
      currentY: 0,
      initialX: 0,
      initialY: 0,
      xOffset: 0,
      yOffset: 0,
      isMinimized: false,
      originalTransform: window.style.transform,
      originalOpacity: window.style.opacity,
      windowId,
      title: window.querySelector(".window-title")?.textContent || windowId,
      wasMaximized: false,
    };

    // Start dragging on mousedown
    titleBar.addEventListener("mousedown", ((e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (window.classList.contains("maximized") || state.isMinimized) return;

      window.classList.add("dragging");
      state.initialX = mouseEvent.clientX - state.xOffset;
      state.initialY = mouseEvent.clientY - state.yOffset;
      state.isDragging = true;
      this.bringToFront(window);
    }) as EventListener);

    // Update window position while dragging
    document.addEventListener("mousemove", ((e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (
        state.isDragging &&
        !window.classList.contains("maximized") &&
        !state.isMinimized
      ) {
        e.preventDefault();

        state.currentX = mouseEvent.clientX - state.initialX;
        state.currentY = mouseEvent.clientY - state.initialY;

        // Check for screen edge snapping
        const snappedPosition = this.checkSnapping(
          state.currentX,
          state.currentY
        );
        window.style.transform = `translate(${snappedPosition.x}px, ${snappedPosition.y}px)`;

        state.xOffset = snappedPosition.x;
        state.yOffset = snappedPosition.y;
      }
    }) as EventListener);

    // Stop dragging on mouseup
    document.addEventListener("mouseup", (() => {
      if (state.isDragging) {
        state.isDragging = false;
        window.classList.remove("dragging");
      }
    }) as EventListener);

    // Double click title bar to maximize/restore
    titleBar.addEventListener("dblclick", (() => {
      if (window.querySelector(".maximize-btn")) {
        this.toggleMaximize(window);
      }
    }) as EventListener);

    // Bring window to front when clicking anywhere
    window.addEventListener("mousedown", (() => {
      if (!window.classList.contains("maximized") && !state.isMinimized) {
        this.bringToFront(window);
      }
    }) as EventListener);

    // Initialize minimize button
    const minimizeBtn = window.querySelector(".minimize-btn");
    if (minimizeBtn) {
      minimizeBtn.addEventListener("click", () => {
        this.toggleMinimize(window, state);
      });
    }
  }

  // Toggle window minimize state
  private toggleMinimize(window: HTMLElement, state: WindowState): void {
    if (!state.isMinimized) {
      // Store original state and minimize
      state.originalTransform = window.style.transform;
      state.wasMaximized = window.classList.contains("maximized");

      // If window was maximized, restore it first
      if (state.wasMaximized) {
        window.classList.remove("maximized");
        window.style.transform = `translate(${state.xOffset}px, ${state.yOffset}px)`;
      }

      // Animate to bottom-left
      window.classList.add("minimized");
      setTimeout(() => {
        window.classList.add("minimized-hidden");
      }, 300); // match transition duration

      state.isMinimized = true;
      this.minimizedWindows.set(state.windowId, state);
      this.addToTaskbar(state);
    } else {
      // Restore window
      window.classList.remove("minimized-hidden");
      setTimeout(() => {
        window.classList.remove("minimized");
      }, 10); // allow reflow

      state.isMinimized = false;
      if (state.wasMaximized) {
        window.classList.add("maximized");
        window.style.transform = "none";
      }
      this.minimizedWindows.delete(state.windowId);
      this.removeFromTaskbar(state.windowId);
      this.bringToFront(window);
    }
  }

  // Add window to taskbar
  private addToTaskbar(state: WindowState): void {
    const taskbarButtonsContainer = document.querySelector(
      ".taskbar-buttons-container"
    );
    if (!taskbarButtonsContainer) return;

    // Check if button already exists
    const existingButton = document.querySelector(
      `.taskbar-button[data-window-id="${state.windowId}"]`
    );
    if (existingButton) return;

    const button = document.createElement("button");
    button.className = `
      flex items-center px-4 py-1
      bg-gradient-to-b from-[#7ec6fa] to-[#3b6eb1]
      border border-[#2056a5]
      rounded-lg
      shadow-[inset_0_1px_0_0_#fff,0_1px_2px_#2056a5]
      focus:outline-none
      active:translate-y-px
      min-w-[120px]
      max-w-xs
      taskbar-button
      ml-2
      transition-all
      duration-150
      ease-in-out
      hover:from-[#8ed1fb]
      hover:to-[#4b7ec2]
      active:from-[#6ebbf9]
      active:to-[#2b5ea0]
    `;
    button.dataset.windowId = state.windowId;
    button.innerHTML = `
      <span class="text-white font-medium text-sm drop-shadow-[0_1px_0_#2056a5]">
        ${state.title}
      </span>
    `;

    button.addEventListener("click", () => {
      const window = document.getElementById(state.windowId);
      if (window) {
        const currentState = this.minimizedWindows.get(state.windowId);
        if (currentState) {
          this.toggleMinimize(window, currentState);
        }
      }
    });

    taskbarButtonsContainer.appendChild(button);
  }

  // Remove window from taskbar
  private removeFromTaskbar(windowId: string): void {
    const button = document.querySelector(
      `.taskbar-button[data-window-id="${windowId}"]`
    );
    if (button) {
      button.remove();
    }
  }

  // Bring window to front
  private bringToFront(window: HTMLElement): void {
    if (!window.classList.contains("maximized")) {
      this.maxZIndex++;
      window.style.zIndex = this.maxZIndex.toString();
    }
  }

  // Toggle window maximize state
  public toggleMaximize(window: HTMLElement): void {
    window.classList.toggle("maximized");
    if (window.classList.contains("maximized")) {
      window.style.zIndex = "9999";
    } else {
      this.bringToFront(window);
    }
  }

  // Check if window should snap to screen edges
  private checkSnapping(x: number, y: number): { x: number; y: number } {
    const { threshold, snapPoints } = this.snapConfig;
    let snappedX = x;
    let snappedY = y;

    // Snap to top
    if (Math.abs(y) < threshold) {
      snappedY = snapPoints.top;
    }
    // Snap to bottom
    else if (Math.abs(window.innerHeight - y) < threshold) {
      snappedY = snapPoints.bottom - window.innerHeight;
    }

    // Snap to left
    if (Math.abs(x) < threshold) {
      snappedX = snapPoints.left;
    }
    // Snap to right
    else if (Math.abs(window.innerWidth - x) < threshold) {
      snappedX = snapPoints.right - window.innerWidth;
    }

    return { x: snappedX, y: snappedY };
  }

  // Update snap points when window is resized
  public updateSnapPoints(): void {
    this.snapConfig.snapPoints = {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth,
    };
  }
}
