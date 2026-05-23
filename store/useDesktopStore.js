import { create } from 'zustand';

export const useDesktopStore = create((set, get) => ({
  // State
  openWindows: [],
  activeWindowId: null,
  highestZIndex: 100,
  isStartMenuOpen: false,
  contextMenu: { isVisible: false, x: 0, y: 0 },
  refreshCounter: 0,

  // Actions
  openWindow: (app) => {
    const { openWindows, highestZIndex } = get();
    const existingWindow = openWindows.find((w) => w.id === app.id);

    if (existingWindow) {
      // Window is already open, focus it and restore if minimized
      const newZIndex = highestZIndex + 1;
      set({
        openWindows: openWindows.map((w) =>
          w.id === app.id
            ? { ...w, isMinimized: false, zIndex: newZIndex }
            : w
        ),
        activeWindowId: app.id,
        highestZIndex: newZIndex,
        isStartMenuOpen: false, // Close start menu on opening app
      });
    } else {
      // Create and open new window
      const newZIndex = highestZIndex + 1;
      const newWindow = {
        id: app.id,
        title: app.name,
        icon: app.iconPath,
        componentName: app.componentName,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZIndex,
        width: app.defaultWidth || 600,
        height: app.defaultHeight || 400,
        x: null,
        y: null,
        type: app.type || 'system',
        filePath: app.filePath,
      };

      set({
        openWindows: [...openWindows, newWindow],
        activeWindowId: app.id,
        highestZIndex: newZIndex,
        isStartMenuOpen: false,
      });
    }
  },

  closeWindow: (id) => {
    const { openWindows, activeWindowId } = get();
    const remainingWindows = openWindows.filter((w) => w.id !== id);

    set({ openWindows: remainingWindows });

    // If closing the active window, focus the next highest z-index window
    if (activeWindowId === id) {
      if (remainingWindows.length > 0) {
        // Find non-minimized window with highest z-index
        const visibleWindows = remainingWindows.filter((w) => !w.isMinimized);
        if (visibleWindows.length > 0) {
          const highest = visibleWindows.reduce((prev, current) =>
            prev.zIndex > current.zIndex ? prev : current
          );
          set({ activeWindowId: highest.id });
        } else {
          set({ activeWindowId: null });
        }
      } else {
        set({ activeWindowId: null });
      }
    }
  },

  minimizeWindow: (id) => {
    const { openWindows, activeWindowId } = get();
    
    set({
      openWindows: openWindows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    });

    // If minimizing active window, shift focus
    if (activeWindowId === id) {
      const remainingVisible = openWindows.filter(
        (w) => w.id !== id && !w.isMinimized
      );
      if (remainingVisible.length > 0) {
        const highest = remainingVisible.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current
        );
        set({ activeWindowId: highest.id });
      } else {
        set({ activeWindowId: null });
      }
    }
  },

  maximizeWindow: (id) => {
    const { openWindows } = get();
    set({
      openWindows: openWindows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    });
    // Also focus it
    get().focusWindow(id);
  },

  focusWindow: (id) => {
    const { openWindows, highestZIndex, activeWindowId } = get();
    // Only update if it's not already focused and is not minimized
    const target = openWindows.find((w) => w.id === id);
    if (!target) return;

    if (activeWindowId === id && !target.isMinimized) return;

    const newZIndex = highestZIndex + 1;
    set({
      openWindows: openWindows.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
      ),
      activeWindowId: id,
      highestZIndex: newZIndex,
    });
  },

  toggleStartMenu: (isOpen) => {
    set((state) => ({
      isStartMenuOpen: typeof isOpen === 'boolean' ? isOpen : !state.isStartMenuOpen,
    }));
  },

  updateWindowPosition: (id, x, y) => {
    const { openWindows } = get();
    set({
      openWindows: openWindows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    });
  },

  updateWindowSize: (id, width, height) => {
    const { openWindows } = get();
    set({
      openWindows: openWindows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    });
  },

  openContextMenu: (x, y) => {
    set({
      contextMenu: { isVisible: true, x, y },
      isStartMenuOpen: false,
    });
  },

  closeContextMenu: () => {
    set({
      contextMenu: { isVisible: false, x: 0, y: 0 },
    });
  },

  refreshDesktop: () => {
    set((state) => ({
      refreshCounter: state.refreshCounter + 1,
      contextMenu: { isVisible: false, x: 0, y: 0 },
    }));
  },
}));
