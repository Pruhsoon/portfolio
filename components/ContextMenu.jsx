'use client';

import React, { useEffect, useRef } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';

export default function ContextMenu() {
  const { contextMenu, closeContextMenu, refreshDesktop } = useDesktopStore();
  const menuRef = useRef(null);

  useEffect(() => {
    // Adjust position if it would overflow the viewport boundaries
    if (contextMenu.isVisible && menuRef.current && typeof window !== 'undefined') {
      const menuWidth = menuRef.current.offsetWidth || 150;
      const menuHeight = menuRef.current.offsetHeight || 140;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let targetX = contextMenu.x;
      let targetY = contextMenu.y;

      if (contextMenu.x + menuWidth > windowWidth) {
        targetX = windowWidth - menuWidth - 5;
      }
      if (contextMenu.y + menuHeight > windowHeight) {
        targetY = windowHeight - menuHeight - 5;
      }

      menuRef.current.style.left = `${targetX}px`;
      menuRef.current.style.top = `${targetY}px`;
    }
  }, [contextMenu.isVisible, contextMenu.x, contextMenu.y]);

  // Click outside to close context menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeContextMenu();
      }
    };
    if (contextMenu.isVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [contextMenu.isVisible, closeContextMenu]);

  if (!contextMenu.isVisible) return null;

  return (
    <div
      ref={menuRef}
      className="absolute bg-[#f1efe7] text-black border border-[#808080] p-[2px] shadow-[2px_2px_3px_rgba(0,0,0,0.3)] select-none z-[9999] min-w-[155px] font-sans text-xs"
      style={{
        boxShadow: '2px 2px 2px rgba(0,0,0,0.4), inset 1px 1px 0px #fff',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col py-0.5">
        {/* Arrange Icons By */}
        <div className="flex items-center justify-between px-3 py-1 cursor-default text-[#808080] hover:bg-transparent">
          <span>Arrange Icons By</span>
          <span className="scale-75">▶</span>
        </div>
        
        {/* Refresh */}
        <button
          onClick={() => {
            refreshDesktop();
          }}
          className="flex w-full text-left px-3 py-1.5 hover:bg-[#316ac5] hover:text-white cursor-default outline-none border-none bg-transparent font-sans text-xs text-black"
        >
          Refresh
        </button>

        {/* Separator */}
        <div className="h-[1px] bg-[#aca899] my-1 mx-[1px] border-b border-white" />

        {/* Paste */}
        <div className="flex items-center px-3 py-1 cursor-default text-[#808080]">
          <span>Paste</span>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-[#aca899] my-1 mx-[1px] border-b border-white" />

        {/* Properties */}
        <button
          onClick={() => {
            alert("Display Properties Dialog is not available in this demo. Customize your theme by exploring folders!");
            closeContextMenu();
          }}
          className="flex w-full text-left px-3 py-1.5 hover:bg-[#316ac5] hover:text-white cursor-default outline-none border-none bg-transparent font-sans text-xs text-black"
        >
          Properties
        </button>
      </div>
    </div>
  );
}
