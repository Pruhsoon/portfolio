'use client';

import React, { useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useDesktopStore } from '../store/useDesktopStore';

export default function WindowContainer({ win, children }) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
    openWindows,
  } = useDesktopStore();

  // Initialize centered cascading position on mount if position is null
  useEffect(() => {
    if (win.x === null || win.y === null) {
      const index = openWindows.findIndex((w) => w.id === win.id);
      const offset = 25 * (index !== -1 ? index % 10 : 0);
      
      if (typeof window !== 'undefined') {
        const workspaceWidth = window.innerWidth;
        const workspaceHeight = window.innerHeight - 40; // Exclude taskbar (40px)
        
        // Ensure default size doesn't exceed screen size, leaving a comfortable margin
        const targetWidth = Math.min(win.width || 600, workspaceWidth - 40);
        const targetHeight = Math.min(win.height || 400, workspaceHeight - 40);

        if (targetWidth !== win.width || targetHeight !== win.height) {
          updateWindowSize(win.id, targetWidth, targetHeight);
        }

        const initX = Math.max(10, (workspaceWidth - targetWidth) / 2) + offset;
        const initY = Math.max(10, (workspaceHeight - targetHeight) / 2) + offset;
        updateWindowPosition(win.id, initX, initY);
      }
    }
  }, [win.id, win.x, win.y, win.width, win.height, openWindows, updateWindowPosition, updateWindowSize]);

  const isActive = win.id === activeWindowId;

  const handleMouseDown = () => {
    if (!isActive) {
      focusWindow(win.id);
    }
  };

  return (
    <Rnd
      size={{
        width: win.isMaximized ? '100%' : (win.width || 600),
        height: win.isMaximized ? '100%' : (win.height || 400),
      }}
      position={{
        x: win.isMaximized ? 0 : (win.x ?? 0),
        y: win.isMaximized ? 0 : (win.y ?? 0),
      }}
      disableDragging={win.isMaximized}
      enableResizing={win.isMaximized ? false : {
        top: true, right: true, bottom: true, left: true,
        topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
      }}
      dragHandleClassName="title-bar"
      onDragStop={(e, d) => {
        updateWindowPosition(win.id, d.x, d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(win.id, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(win.id, position.x, position.y);
      }}
      bounds="parent"
      style={{ zIndex: win.zIndex }}
      onMouseDown={handleMouseDown}
      className="absolute pointer-events-auto flex flex-col"
    >
      <div className={`window flex flex-col h-full w-full select-text ${isActive ? '' : 'inactive'}`}>
        {/* Title Bar */}
        <div className="title-bar cursor-move select-none flex justify-between items-center">
          <div className="title-bar-text flex items-center gap-1.5 font-sans font-bold">
            {win.icon && (
              <img 
                src={win.icon} 
                alt="" 
                className="w-4 h-4 object-contain" 
                draggable={false} 
              />
            )}
            <span>{win.title}</span>
          </div>
          <div className="title-bar-controls flex items-center">
            <button 
              aria-label="Minimize" 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} 
              onMouseDown={(e) => e.stopPropagation()}
            />
            <button 
              aria-label={win.isMaximized ? "Restore" : "Maximize"} 
              onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }} 
              onMouseDown={(e) => e.stopPropagation()}
            />
            <button 
              aria-label="Close" 
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} 
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        {/* Window Body */}
        <div className="window-body flex-1 overflow-hidden bg-[#f1efe7] relative m-0 flex flex-col">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
