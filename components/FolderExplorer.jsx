'use client';

import React, { useState } from 'react';
import { APP_REGISTRY } from '../config/systemConfig';
import { useDesktopStore } from '../store/useDesktopStore';

export default function FolderExplorer({ folderId }) {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const [selectedId, setSelectedId] = useState(null);

  // Retrieve folder details
  const folder = APP_REGISTRY.find((item) => item.id === folderId);
  const contents = folder?.contents || [];

  // Resolve item details for each ID in contents
  const items = contents
    .map((id) => APP_REGISTRY.find((item) => item.id === id))
    .filter(Boolean);

  const handleItemClick = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
  };

  const handleBackgroundClick = () => {
    setSelectedId(null);
  };

  const handleItemDoubleClick = (e, item) => {
    e.stopPropagation();
    openWindow(item);
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#f1efe7] font-sans text-xs select-none"
      onClick={handleBackgroundClick}
    >
      {/* File Explorer Header Toolbar */}
      <div className="flex items-center gap-1.5 p-1 border-b border-[#d0ccbf] bg-[#ece9d8] shrink-0">
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-white flex items-center gap-1">
          <span className="text-[#000080]">←</span> Back
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-white flex items-center gap-1">
          Up <span>↑</span>
        </button>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-white flex items-center">
          Search
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-white flex items-center">
          Folders
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-1.5 p-1 border-b border-[#d0ccbf] bg-[#ece9d8] shrink-0">
        <span className="text-[#808080] pl-1.5 pr-1">Address</span>
        <div className="flex-1 px-1.5 py-0.5 border border-[#7f9db9] bg-white h-[20px] flex items-center text-black">
          C:\Documents and Settings\Prasun\My Documents\{folder?.name || ''}
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side Panel (XP Tasks Style) */}
        <div className="w-[185px] bg-gradient-to-b from-[#748cbd] to-[#4d669c] p-2.5 flex flex-col gap-3 overflow-auto shrink-0 border-r border-[#002e9a]">
          {/* Section 1: File and Folder Tasks */}
          <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
            <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
              <span>File and Folder Tasks</span>
            </div>
            <div className="p-2 space-y-1.5 bg-[#eceef7]">
              <div className="text-[#002e9a] hover:underline cursor-pointer">Make a new folder</div>
              <div className="text-[#002e9a] hover:underline cursor-pointer">Publish this folder to the Web</div>
              <div className="text-[#002e9a] hover:underline cursor-pointer">Share this folder</div>
            </div>
          </div>

          {/* Section 2: Other Places */}
          <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
            <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
              <span>Other Places</span>
            </div>
            <div className="p-2 space-y-1.5 bg-[#eceef7]">
              <div className="text-[#002e9a] hover:underline cursor-pointer">My Computer</div>
              <div className="text-[#002e9a] hover:underline cursor-pointer">My Documents</div>
              <div className="text-[#002e9a] hover:underline cursor-pointer">Shared Documents</div>
            </div>
          </div>

          {/* Section 3: Details */}
          <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
            <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
              <span>Details</span>
            </div>
            <div className="p-2 bg-[#eceef7]">
              <div className="font-bold text-black truncate">{folder?.name || ''}</div>
              <div className="text-[#808080]">System Folder</div>
              <div className="text-[#808080] mt-1">Files: {items.length}</div>
            </div>
          </div>
        </div>

        {/* Right Side Icons Grid */}
        <div className="flex-1 bg-white p-4 overflow-auto border-l border-white shadow-inner">
          {items.length === 0 ? (
            <div className="text-[#808080] text-center mt-8">This folder is empty.</div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-x-2 gap-y-5 justify-items-center">
              {items.map((item) => {
                const isSelected = selectedId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={(e) => handleItemClick(e, item.id)}
                    onDoubleClick={(e) => handleItemDoubleClick(e, item)}
                    className="flex flex-col items-center w-[80px] cursor-default text-center group"
                  >
                    {/* Icon container */}
                    <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                      <img
                        src={item.iconPath}
                        alt=""
                        className={`w-8 h-8 object-contain transition-all duration-75 ${
                          isSelected ? 'brightness-75 select-none filter drop-shadow-[0_0_1px_#0028b0]' : 'group-hover:brightness-95'
                        }`}
                        draggable={false}
                      />
                      {/* Selection overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#0a5fe4]/20 border border-[#0a5fe4]/40 rounded-sm pointer-events-none" />
                      )}
                    </div>

                    {/* Text block */}
                    <div 
                      className={`mt-1 px-1.5 py-0.5 rounded-sm text-[11px] leading-tight select-none border border-transparent break-words text-center w-full line-clamp-2 ${
                        isSelected 
                          ? 'bg-[#0a5fe4] text-white border-[#002e9a]' 
                          : 'text-black group-hover:underline'
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
