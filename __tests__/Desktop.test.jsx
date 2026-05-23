import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Desktop from '@/components/Desktop';
import { useDesktopStore } from '@/store/useDesktopStore';

describe('Desktop & ContextMenu Integration Tests', () => {
  // Store initial state to reset between tests
  const initialState = useDesktopStore.getState();

  beforeEach(() => {
    useDesktopStore.setState(initialState);
    vi.clearAllMocks();
  });

  it('should display the ContextMenu when right-clicked on the desktop background', () => {
    // Arrange
    const { container } = render(<Desktop />);
    
    // Initially, context menu options should not be visible
    expect(screen.queryByText('Arrange Icons By')).not.toBeInTheDocument();
    expect(screen.queryByText('Refresh')).not.toBeInTheDocument();

    // Act - Trigger right-click (contextmenu event) on the desktop background div
    fireEvent.contextMenu(container.firstChild);

    // Assert
    expect(screen.getByText('Arrange Icons By')).toBeInTheDocument();
    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('should remove the ContextMenu from the DOM when left-clicked elsewhere on the screen', () => {
    // Arrange
    const { container } = render(<Desktop />);
    
    // Open context menu
    fireEvent.contextMenu(container.firstChild);
    expect(screen.getByText('Arrange Icons By')).toBeInTheDocument();

    // Act - Click outside the menu (on the desktop background)
    fireEvent.click(container.firstChild);

    // Assert
    expect(screen.queryByText('Arrange Icons By')).not.toBeInTheDocument();
  });

  it('should close the ContextMenu and increment refreshCounter when Refresh is clicked', () => {
    // Arrange
    const { container } = render(<Desktop />);
    
    // Open context menu
    fireEvent.contextMenu(container.firstChild);
    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(useDesktopStore.getState().refreshCounter).toBe(0);

    // Act - Click the "Refresh" action
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);

    // Assert
    // Context menu is removed from the DOM
    expect(screen.queryByText('Arrange Icons By')).not.toBeInTheDocument();
    
    // Zustand store's refreshCounter is incremented
    expect(useDesktopStore.getState().refreshCounter).toBe(1);
  });
});
