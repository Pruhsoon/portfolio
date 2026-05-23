'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDesktopStore } from '../store/useDesktopStore';
import { APP_REGISTRY } from '../config/systemConfig';

export default function StartMenu() {
  const { isStartMenuOpen, toggleStartMenu, openWindow } = useDesktopStore();
  const menuRef = useRef(null);

  // Close start menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!isStartMenuOpen) return;

      // Do nothing if clicked inside start menu
      if (menuRef.current && menuRef.current.contains(event.target)) {
        return;
      }

      // Do nothing if clicked on the start button itself
      if (event.target.closest('#start-button')) {
        return;
      }

      toggleStartMenu(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStartMenuOpen, toggleStartMenu]);

  if (!isStartMenuOpen) return null;

  // Find system registry items to link directly
  const ieApp = APP_REGISTRY.find(app => app.id === 'internet-explorer');
  const myComp = APP_REGISTRY.find(app => app.id === 'my-computer');
  const portfolioFolder = APP_REGISTRY.find(app => app.id === 'portfolio-folder');

  const handleAppClick = (app) => {
    if (app) {
      openWindow(app);
    }
    toggleStartMenu(false);
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-10 left-0 w-[380px] bg-[#2979ff] rounded-t-6px border-2 border-[#0053e2] shadow-2xl flex flex-col font-sans select-none z-[9999]"
      style={{
        boxShadow: '3px 3px 15px rgba(0, 0, 0, 0.5), inset 1px 1px 1px rgba(255, 255, 255, 0.4)',
      }}
    >
      {/* Header Banner */}
      <div 
        className="h-[60px] flex items-center px-3 pb-1 border-b-2 border-[#df5f07] rounded-t-[4px] bg-gradient-to-r from-[#1856d1] via-[#3f8cf3] to-[#1856d1]"
      >
        {/* User Avatar */}
        <div className="relative w-[44px] h-[44px] mr-2.5 rounded-[4px] border-2 border-[#dfb455] bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
          <svg className="w-10 h-10 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Retro Chess Knight or Orange Flower representation */}
            <path d="M12 2C9.24 2 7 4.24 7 7C7 8.38 7.56 9.62 8.47 10.53C6.23 11.72 4.5 13.9 4 16.5C3.75 17.8 4.75 19 6.07 19H17.93C19.25 19 20.25 17.8 20 16.5C19.5 13.9 17.77 11.72 15.53 10.53C16.44 9.62 17 8.38 17 7C17 4.24 14.76 2 12 2Z" fill="#ff9800"/>
            <circle cx="12" cy="7" r="3" fill="#ffeb3b"/>
            <path d="M12 10V19" stroke="#fff" strokeWidth="2"/>
          </svg>
        </div>
        {/* User Name */}
        <span 
          className="text-white font-bold text-sm tracking-wide"
          style={{ textShadow: '1px 1px 1px #0e3079' }}
        >
          Prasun
        </span>
      </div>

      {/* Main Body */}
      <div className="flex bg-[#fff] text-[11px] leading-[14px]">
        {/* Left Column (Pinned Apps) */}
        <div className="w-[53%] p-1.5 flex flex-col bg-white">
          {/* Internet Explorer */}
          <div 
            onClick={() => handleAppClick(ieApp)}
            className="flex items-center p-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-8 h-8 mr-2 shrink-0 flex items-center justify-center">
              <Image src="/icons/internet-explorer.svg" alt="IE" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-black group-hover:text-white">Internet</span>
              <span className="text-gray-500 text-[10px] group-hover:text-blue-100">Internet Explorer</span>
            </div>
          </div>

          {/* Outlook Express */}
          <div 
            onClick={() => handleAppClick(null)}
            className="flex items-center p-1 mt-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-8 h-8 mr-2 shrink-0 flex items-center justify-center">
              {/* Outlook Express Envelope SVG */}
              <svg className="w-[28px] h-[28px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="28" height="20" rx="2" fill="#fff" stroke="#1f5dc5" strokeWidth="2"/>
                <path d="M2 8L16 18L30 8" stroke="#1f5dc5" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 24L11 16" stroke="#1f5dc5" strokeWidth="2"/>
                <path d="M30 24L21 16" stroke="#1f5dc5" strokeWidth="2"/>
                <path d="M12 4L16 10L20 4" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-black group-hover:text-white">E-mail</span>
              <span className="text-gray-500 text-[10px] group-hover:text-blue-100">Outlook Express</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#e0e0e0] my-1 mx-1"></div>

          {/* Notepad */}
          <div 
            onClick={() => handleAppClick(null)}
            className="flex items-center p-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-8 h-8 mr-2 shrink-0 flex items-center justify-center">
              {/* Notepad SVG */}
              <svg className="w-[26px] h-[26px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="2" width="24" height="28" rx="2" fill="#ffeb3b" stroke="#e65100" strokeWidth="2"/>
                <line x1="8" y1="8" x2="24" y2="8" stroke="#e65100" strokeWidth="2"/>
                <line x1="8" y1="14" x2="24" y2="14" stroke="#e65100" strokeWidth="2"/>
                <line x1="8" y1="20" x2="20" y2="20" stroke="#e65100" strokeWidth="2"/>
                <rect x="2" y="2" width="4" height="2" fill="#757575"/>
                <rect x="26" y="2" width="4" height="2" fill="#757575"/>
              </svg>
            </div>
            <span className="font-bold text-black group-hover:text-white">Notepad</span>
          </div>

          {/* Paint */}
          <div 
            onClick={() => handleAppClick(null)}
            className="flex items-center p-1 mt-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-8 h-8 mr-2 shrink-0 flex items-center justify-center">
              {/* Paint Palette SVG */}
              <svg className="w-[26px] h-[26px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.28 2 2 8.28 2 16C2 23.72 8.28 30 16 30C18 30 19.5 28.5 19.5 26.5C19.5 25.5 19.1 24.6 18.5 23.9C18.2 23.6 18 23.2 18 22.8C18 21.8 18.8 21 19.8 21H22C26.42 21 30 17.42 30 13C30 6.93 23.72 2 16 2Z" fill="#ffecb3" stroke="#ff8f00" strokeWidth="2"/>
                <circle cx="9.5" cy="13.5" r="2.5" fill="#f44336"/>
                <circle cx="16.5" cy="8.5" r="2.5" fill="#4caf50"/>
                <circle cx="23.5" cy="11.5" r="2.5" fill="#2196f3"/>
                <circle cx="21.5" cy="17.5" r="2.5" fill="#9c27b0"/>
              </svg>
            </div>
            <span className="font-bold text-black group-hover:text-white">Paint</span>
          </div>

          {/* Spacer to push "All Programs" down */}
          <div className="flex-grow min-h-[40px]"></div>

          <div className="h-[1px] bg-[#e0e0e0] my-1 mx-1"></div>

          {/* All Programs */}
          <div className="flex items-center justify-between p-1.5 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 6H18V8H4V6ZM4 11H18V13H4V11ZM4 16H18V18H4V16Z" />
                </svg>
              </div>
              <span className="font-bold text-black group-hover:text-white text-[12px]">All Programs</span>
            </div>
            <span className="text-[#3c9b3c] font-bold text-xs group-hover:text-white">▶</span>
          </div>
        </div>

        {/* Right Column (System Links) */}
        <div className="w-[47%] p-1.5 bg-[#d3e5fa] border-l border-[#a2c5eb] flex flex-col text-[#0a3180]">
          {/* My Documents */}
          <div 
            onClick={() => handleAppClick(portfolioFolder)}
            className="flex items-center p-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-[22px] h-[22px] mr-1.5 shrink-0 flex items-center justify-center">
              <Image src="/icons/folder.svg" alt="My Documents" width={18} height={18} />
            </div>
            <span className="font-bold text-[#0a3180] group-hover:text-white">My Documents</span>
          </div>

          {/* My Pictures */}
          <div 
            onClick={() => handleAppClick(null)}
            className="flex items-center p-1 mt-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-[22px] h-[22px] mr-1.5 shrink-0 flex items-center justify-center">
              {/* Pictures Folder SVG */}
              <svg className="w-[18px] h-[18px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6C2 4.9 2.9 4 4 4H12L15 8H28C29.1 8 30 8.9 30 10V26C30 27.1 29.1 28 28 28H4C2.9 28 2 27.1 2 26V6Z" fill="#ffca28"/>
                <rect x="8" y="12" width="14" height="10" rx="1" fill="#4caf50" stroke="#fff" strokeWidth="1"/>
                <circle cx="12" cy="15" r="1.5" fill="#ffeb3b"/>
                <path d="M8 20L12 16L16 19L20 15L22 18V22H8V20Z" fill="#1b5e20"/>
              </svg>
            </div>
            <span className="text-[#0a3180] group-hover:text-white">My Pictures</span>
          </div>

          {/* My Music */}
          <div 
            onClick={() => handleAppClick(null)}
            className="flex items-center p-1 mt-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-[22px] h-[22px] mr-1.5 shrink-0 flex items-center justify-center">
              {/* Music Folder SVG */}
              <svg className="w-[18px] h-[18px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6C2 4.9 2.9 4 4 4H12L15 8H28C29.1 8 30 8.9 30 10V26C30 27.1 29.1 28 28 28H4C2.9 28 2 27.1 2 26V6Z" fill="#ffca28"/>
                <circle cx="12" cy="20" r="3" fill="#2196f3"/>
                <circle cx="20" cy="18" r="3" fill="#2196f3"/>
                <path d="M15 11L23 9V18M15 11V20" stroke="#0d47a1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[#0a3180] group-hover:text-white">My Music</span>
          </div>

          <div className="h-[1px] bg-[#b0d2f5] my-1 mx-1 shadow-[0_1px_0_#fff]"></div>

          {/* My Computer */}
          <div 
            onClick={() => handleAppClick(myComp)}
            className="flex items-center p-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-[22px] h-[22px] mr-1.5 shrink-0 flex items-center justify-center">
              <Image src="/icons/my-computer.svg" alt="My Computer" width={18} height={18} />
            </div>
            <span className="text-[#0a3180] group-hover:text-white">My Computer</span>
          </div>

          <div className="h-[1px] bg-[#b0d2f5] my-1 mx-1 shadow-[0_1px_0_#fff]"></div>

          {/* Control Panel */}
          <div 
            onClick={() => handleAppClick(null)}
            className="flex items-center p-1 rounded hover:bg-[#3d95ff] hover:text-white cursor-pointer group"
          >
            <div className="relative w-[22px] h-[22px] mr-1.5 shrink-0 flex items-center justify-center">
              {/* Control Panel SVG */}
              <svg className="w-[18px] h-[18px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="28" height="28" rx="2" fill="#cfd8dc" stroke="#455a64" strokeWidth="2"/>
                <rect x="6" y="6" width="6" height="8" rx="1" fill="#fff" stroke="#455a64" strokeWidth="2"/>
                <line x1="9" y1="14" x2="9" y2="26" stroke="#455a64" strokeWidth="2"/>
                <rect x="20" y="16" width="6" height="8" rx="1" fill="#fff" stroke="#455a64" strokeWidth="2"/>
                <line x1="23" y1="6" x2="23" y2="16" stroke="#455a64" strokeWidth="2"/>
                <line x1="23" y1="24" x2="23" y2="26" stroke="#455a64" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-[#0a3180] group-hover:text-white">Control Panel</span>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div 
        className="h-[44px] flex items-center justify-end px-3 py-1.5 border-t border-[#1a44a0] rounded-b-[4px] bg-gradient-to-r from-[#1856d1] via-[#3f8cf3] to-[#1856d1] gap-3"
      >
        {/* Log Off Button */}
        <button 
          onClick={() => toggleStartMenu(false)}
          className="flex items-center text-white font-normal hover:brightness-110 active:brightness-90 text-[11px] cursor-pointer"
        >
          <div className="w-[20px] h-[20px] mr-1.5 flex items-center justify-center shrink-0 rounded bg-[#ff9800] shadow-[inset_1px_1px_1px_#ffe082]">
            {/* Key Icon */}
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18C4.24 18 2 15.76 2 13C2 10.24 4.24 8 7 8C8.94 8 10.6 9.1 11.4 10.7L18.3 3.8C18.7 3.4 19.3 3.4 19.7 3.8L20.2 4.3C20.6 4.7 20.6 5.3 20.2 5.7L18.7 7.2L20.2 8.7C20.6 9.1 20.6 9.7 20.2 10.1L19.7 10.6C19.3 11 18.7 11 18.3 10.6L16.8 9.1L14.7 11.2C14.9 11.8 15 12.4 15 13C15 15.76 12.76 18 10 18H7ZM7 10C5.34 10 4 11.34 4 13C4 14.66 5.34 16 7 16H10C11.66 16 13 14.66 13 13C13 11.34 11.66 10 10 10H7ZM7 12C7.55 12 8 12.45 8 13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13C6 12.45 6.45 12 7 12Z" />
            </svg>
          </div>
          <span style={{ textShadow: '1px 1px 1px #0e3079' }}>Log Off</span>
        </button>

        {/* Turn Off Computer Button */}
        <button 
          onClick={() => toggleStartMenu(false)}
          className="flex items-center text-white font-normal hover:brightness-110 active:brightness-90 text-[11px] cursor-pointer"
        >
          <div className="w-[20px] h-[20px] mr-1.5 flex items-center justify-center shrink-0 rounded bg-[#d32f2f] shadow-[inset_1px_1px_1px_#ef9a9a]">
            {/* Power Icon */}
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12.55 2 13 2.45 13 3V11C13 11.55 12.55 12 12 12C11.45 12 11 11.55 11 11V3C11 2.45 11.45 2 12 2ZM16.56 5.44C16.97 5.03 17.63 5.03 18.04 5.44C19.82 7.22 20.78 9.61 20.78 12C20.78 16.85 16.85 20.78 12 20.78C7.15 20.78 3.22 16.85 3.22 12C3.22 9.61 4.18 7.22 5.96 5.44C6.37 5.03 7.03 5.03 7.44 5.44C7.85 5.85 7.85 6.51 7.44 6.92C6.06 8.3 5.22 10.15 5.22 12C5.22 15.74 8.26 18.78 12 18.78C15.74 18.78 18.78 15.74 18.78 12C18.78 10.15 17.94 8.3 16.56 6.92C16.15 6.51 16.15 5.85 16.56 5.44Z" />
            </svg>
          </div>
          <span style={{ textShadow: '1px 1px 1px #0e3079' }}>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
}
