'use client';

import React from 'react';
import Image from 'next/image';
import { useDesktopStore } from '../store/useDesktopStore';
import Clock from './Clock';

export default function Taskbar() {
  const { 
    openWindows, 
    activeWindowId, 
    focusWindow, 
    minimizeWindow, 
    toggleStartMenu 
  } = useDesktopStore();

  const handleTabClick = (winId) => {
    const win = openWindows.find((w) => w.id === winId);
    if (!win) return;

    if (activeWindowId === winId && !win.isMinimized) {
      // If already active and visible, minimize it
      minimizeWindow(winId);
    } else {
      // Otherwise, focus (which will restore if minimized)
      focusWindow(winId);
    }
  };

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-[#245dd7] via-[#3f8cf3] to-[#245dd7] border-t border-[#1a44a0] flex items-center justify-between z-[9999] select-none font-sans"
      style={{
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 -2px 5px rgba(0,0,0,0.15)',
      }}
    >
      {/* Start Button (Left) */}
      <button
        id="start-button"
        onClick={() => toggleStartMenu()}
        className="h-full flex items-center px-4.5 bg-gradient-to-b from-[#53a93f] via-[#3c9b3c] to-[#277a27] text-white italic font-bold text-lg rounded-r-[10px] shadow-[inset_-1px_1px_1px_#8ed273,2px_0_3px_rgba(0,0,0,0.25)] border-r border-[#1a5a1a] hover:brightness-110 active:brightness-95 select-none cursor-pointer z-50"
        style={{ textShadow: '1px 1px 1px #0f3d0f' }}
      >
        <svg className="w-5 h-5 mr-1.5 drop-shadow-sm shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Classic Windows XP wavy flag flag logo */}
          <path d="M3 5.5C5.5 5 7.5 6.5 10 5.5C10 5.5 11 11 11 12.5C8.5 13.5 6.5 12 3 13C3 13 3.5 7.5 3 5.5Z" fill="#f44336"/>
          <path d="M12 5.5C14.5 4.5 16.5 6 19 5C19.5 7 19 12.5 19 12.5C16.5 13.5 14.5 12 12 13C12 11.5 12 5.5 12 5.5Z" fill="#2196f3"/>
          <path d="M3 14C5.5 13 7.5 14.5 10 13.5C10 13.5 10 19 10 20.5C7.5 21.5 5.5 20 3 21C3 21 3.5 16 3 14Z" fill="#ffeb3b"/>
          <path d="M12 14C14.5 13 16.5 14.5 19 13.5C19 13.5 19 19 19 20.5C16.5 21.5 14.5 20 12 21C12 19.5 12 14 12 14Z" fill="#4caf50"/>
        </svg>
        <span>start</span>
      </button>

      {/* Window Tabs (Middle) */}
      <div className="flex-1 flex items-center h-full px-2 gap-1 overflow-x-auto scrollbar-none">
        {openWindows.map((win) => {
          const isActive = win.id === activeWindowId && !win.isMinimized;
          return (
            <div
              key={win.id}
              onClick={() => handleTabClick(win.id)}
              className={`flex items-center h-[28px] max-w-[150px] min-w-[75px] px-2 rounded.5 border border-[#1a44a0] cursor-pointer select-none transition-colors duration-75 text-white text-[11px] font-sans shrink-0
                ${
                  isActive
                    ? 'bg-[#1947a3] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6)] border-[#0d2e74]'
                    : 'bg-gradient-to-b from-[#3c8df2] via-[#245dd7] to-[#1f52bc] hover:from-[#57a1ff] hover:to-[#3876e6] shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.2),inset_1px_1px_1px_rgba(255,255,255,0.3)]'
                }
              `}
            >
              <div className="relative w-3.5 h-3.5 mr-1.5 shrink-0 flex items-center justify-center">
                <Image 
                  src={win.icon} 
                  alt={win.title} 
                  width={14} 
                  height={14} 
                  className="object-contain" 
                  draggable={false}
                />
              </div>
              <span className="truncate flex-1 pr-1 font-sans font-normal text-white">{win.title}</span>
            </div>
          );
        })}
      </div>

      {/* System Tray (Right) */}
      <div 
        className="h-full px-3 flex items-center gap-2 border-l border-[#084e8a] bg-gradient-to-b from-[#0996f8] to-[#096ec8] z-50 shrink-0"
        style={{
          boxShadow: 'inset 2px 0 2px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)',
        }}
      >
        {/* Placeholder icons */}
        <div className="flex items-center gap-1.5 mr-1.5 opacity-90">
          <div className="w-4 h-4 flex items-center justify-center cursor-pointer hover:brightness-110 active:opacity-75">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM3 9V15H7L12 20V4L7 9H3Z" />
            </svg>
          </div>
          <div className="w-4 h-4 flex items-center justify-center cursor-pointer hover:brightness-110 active:opacity-75">
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="8" y="2" width="10" height="8" rx="1" fill="#90caf9" stroke="#0d47a1" strokeWidth="1"/>
              <polygon points="11,10 9,13 17,13 15,10" fill="#0d47a1"/>
              <rect x="3" y="6" width="10" height="8" rx="1" fill="#a5d6a7" stroke="#1b5e20" strokeWidth="1"/>
              <polygon points="6,14 4,17 12,17 10,14" fill="#1b5e20"/>
            </svg>
          </div>
        </div>
        {/* Actual Clock */}
        <Clock />
      </div>
    </div>
  );
}
