import { describe, it, expect, beforeEach } from 'vitest';
import { useDesktopStore } from '@/store/useDesktopStore';

describe('useDesktopStore Unit Tests', () => {
  // Store the initial state so we can reset it between tests
  const initialState = useDesktopStore.getState();

  beforeEach(() => {
    useDesktopStore.setState(initialState);
  });

  it('should add a window to the state and set it as active when openWindow is called', () => {
    // Arrange
    const mockApp = {
      id: 'test-app',
      name: 'Test App',
      iconPath: '/icons/test.svg',
      componentName: 'TestComponent',
      defaultWidth: 500,
      defaultHeight: 300,
      type: 'app',
    };

    // Act
    useDesktopStore.getState().openWindow(mockApp);

    // Assert
    const state = useDesktopStore.getState();
    expect(state.openWindows).toHaveLength(1);
    expect(state.openWindows[0]).toEqual(
      expect.objectContaining({
        id: 'test-app',
        title: 'Test App',
        icon: '/icons/test.svg',
        componentName: 'TestComponent',
        width: 500,
        height: 300,
        isMinimized: false,
        isMaximized: false,
        type: 'app',
      })
    );
    expect(state.activeWindowId).toBe('test-app');
    expect(state.highestZIndex).toBe(101);
  });

  it('should increment highestZIndex and update activeWindowId when focusWindow is called', () => {
    // Arrange
    const mockApp1 = {
      id: 'app-1',
      name: 'App 1',
      iconPath: '/icons/app1.svg',
      componentName: 'App1Component',
      type: 'app',
    };
    const mockApp2 = {
      id: 'app-2',
      name: 'App 2',
      iconPath: '/icons/app2.svg',
      componentName: 'App2Component',
      type: 'app',
    };

    // Open first app (zIndex becomes 101, active becomes app-1)
    useDesktopStore.getState().openWindow(mockApp1);
    // Open second app (zIndex becomes 102, active becomes app-2)
    useDesktopStore.getState().openWindow(mockApp2);

    // Act - Focus first app
    useDesktopStore.getState().focusWindow('app-1');

    // Assert
    const state = useDesktopStore.getState();
    expect(state.activeWindowId).toBe('app-1');
    expect(state.highestZIndex).toBe(103);

    // Check that App 1's zIndex in the array is updated to the new highest Z-index
    const app1Window = state.openWindows.find((w) => w.id === 'app-1');
    expect(app1Window.zIndex).toBe(103);
  });

  it('should completely remove the item from openWindows array when closeWindow is called', () => {
    // Arrange
    const mockApp = {
      id: 'test-app',
      name: 'Test App',
      iconPath: '/icons/test.svg',
      componentName: 'TestComponent',
      type: 'app',
    };
    useDesktopStore.getState().openWindow(mockApp);

    // Act
    useDesktopStore.getState().closeWindow('test-app');

    // Assert
    const state = useDesktopStore.getState();
    expect(state.openWindows).toHaveLength(0);
    expect(state.activeWindowId).toBeNull();
  });
});
