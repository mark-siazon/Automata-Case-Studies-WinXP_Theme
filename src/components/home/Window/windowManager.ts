// Window state interface
interface WindowState {
  isDragging: boolean;
  currentX: number;
  currentY: number;
  initialX: number;
  initialY: number;
  xOffset: number;
  yOffset: number;
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
    };

    // Start dragging on mousedown
    titleBar.addEventListener("mousedown", ((e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (window.classList.contains("maximized")) return;

      window.classList.add("dragging");
      state.initialX = mouseEvent.clientX - state.xOffset;
      state.initialY = mouseEvent.clientY - state.yOffset;
      state.isDragging = true;
      this.bringToFront(window);
    }) as EventListener);

    // Update window position while dragging
    document.addEventListener("mousemove", ((e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (state.isDragging && !window.classList.contains("maximized")) {
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
      if (!window.classList.contains("maximized")) {
        this.bringToFront(window);
      }
    }) as EventListener);
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
