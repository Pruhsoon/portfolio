'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WALLPAPER_PATH, APP_REGISTRY } from '../config/systemConfig';
import { useDesktopStore } from '../store/useDesktopStore';
import StartMenu from './StartMenu';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import ContextMenu from './ContextMenu';

export default function Desktop() {
  const [selectedIconId, setSelectedIconId] = useState(null);
  const openWindow = useDesktopStore((state) => state.openWindow);
  const openContextMenu = useDesktopStore((state) => state.openContextMenu);
  const closeContextMenu = useDesktopStore((state) => state.closeContextMenu);
  const refreshCounter = useDesktopStore((state) => state.refreshCounter);
  
  // Filter for items to show on desktop
  const desktopItems = APP_REGISTRY.filter((item) => item.showOnDesktop);

  const handleIconClick = (e, id) => {
    e.stopPropagation(); // Prevent clicking on desktop background from deselecting
    setSelectedIconId(id);
    closeContextMenu();
  };

  const handleIconDoubleClick = (e, item) => {
    e.stopPropagation();
    openWindow(item);
    closeContextMenu();
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    closeContextMenu();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    openContextMenu(e.pageX, e.pageY);
  };

  return (
    <div
      key={refreshCounter}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className="relative w-screen h-screen overflow-hidden select-none bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url('${WALLPAPER_PATH}')`,
      }}
    >
      {/* Desktop Grid Layout */}
      {/* 
        Windows XP desktop icons align vertically in columns.
        Using grid-flow-col (column-major order) with a fixed height and rows.
        The container height is full screen (h-screen) minus the taskbar height (40px/h-10).
      */}
      <div 
        className="grid grid-flow-col auto-cols-[85px] grid-rows-[repeat(auto-fill,95px)] gap-y-2 gap-x-2 pl-5 pt-4 pr-3 pb-3 h-[calc(100vh-40px)] w-fit relative z-[5]"
      >
        {desktopItems.map((item) => {
          const isSelected = selectedIconId === item.id;
          
          return (
            <div
              key={item.id}
              onClick={(e) => handleIconClick(e, item.id)}
              onDoubleClick={(e) => handleIconDoubleClick(e, item)}
              className={`flex flex-col items-center justify-start text-center p-1 rounded-sm cursor-pointer transition-colors duration-75 max-w-[85px] h-[90px] border border-transparent
                ${
                  isSelected
                    ? 'bg-blue-600/30 border-dashed border-blue-400/50'
                    : 'hover:bg-blue-400/20 hover:border-blue-400/30'
                }
              `}
            >
              {/* Icon Image */}
              <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                <Image
                  src={item.iconPath}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="object-contain filter drop-shadow-md"
                  draggable={false}
                />
              </div>

              {/* Icon Label */}
              <div
                className="text-[11px] px-1 leading-[14px] text-white line-clamp-2 select-none break-words text-center"
                style={{
                  textShadow: isSelected ? 'none' : '1px 1px 2px black',
                }}
              >
                <span
                  className={`px-0.5 py-[1px] rounded-sm ${
                    isSelected ? 'bg-[#0A5EA5]' : ''
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Window Manager Workspace Container */}
      <div className="absolute top-0 left-0 right-0 bottom-10 overflow-hidden pointer-events-none z-[10]">
        <WindowManager />
      </div>
      
      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />

      {/* Context Menu */}
      <ContextMenu />
    </div>
  );
}
