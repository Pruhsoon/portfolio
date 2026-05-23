'use client';

import React, { useState } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import WindowContainer from './WindowContainer';
import MarkdownViewer from './MarkdownViewer';
import FolderExplorer from './FolderExplorer';

// Internet Explorer High-Fidelity Retro Placeholder
function InternetExplorerWindow() {
  const [address, setAddress] = useState('http://www.google.com');

  return (
    <div className="flex flex-col h-full bg-[#f1efe7] font-sans text-xs">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-[#d0ccbf] bg-[#ece9d8] select-none shrink-0">
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff] flex items-center gap-1">
          <span className="text-[#000080]">←</span> Back
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff] flex items-center gap-1">
          Forward <span className="text-[#808080]">→</span>
        </button>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff]">
          Stop
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff]">
          Refresh
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff]">
          Home
        </button>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff]">
          Search
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff]">
          Favorites
        </button>
        <button className="px-2 py-0.5 border border-transparent hover:border-[#808080] active:border-[#fff]">
          History
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-1 p-1 border-b border-[#d0ccbf] bg-[#ece9d8] select-none shrink-0">
        <span className="text-[#808080] pl-1 pr-2">Address</span>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-1.5 py-0.5 border border-[#7f9db9] bg-white h-[20px] outline-none"
        />
        <button className="px-3 py-0.5 border border-[#808080] bg-[#ece9d8] font-bold">Go</button>
      </div>

      {/* Viewport: Classic "Page Cannot be Displayed" */}
      <div className="flex-1 overflow-auto bg-white p-8 text-sm text-[#000000]">
        <div className="max-w-[600px] mx-auto font-sans">
          <h1 className="text-[20px] font-bold text-[#003399] leading-tight flex items-start gap-3">
            <span className="text-[28px] leading-6 font-serif font-semibold text-[#0066cc]">i</span>
            The page cannot be displayed
          </h1>
          <p className="mt-4 text-xs text-black">
            The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings.
          </p>

          <hr className="my-4 border-t border-[#0066cc]" />

          <p className="font-bold text-xs">Please try the following:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-black">
            <li>
              Click the <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0028b0] underline hover:text-red-600">Refresh</a> button, or try again later.
            </li>
            <li>
              If you typed the page address in the Address bar, make sure that it is spelled correctly.
            </li>
            <li>
              To check your connection settings, click the <strong>Tools</strong> menu, and then click <strong>Internet Options</strong>. On the <strong>Connections</strong> tab, click <strong>Settings</strong>. The settings should match those provided by your local area network (LAN) administrator or Internet service provider (ISP).
            </li>
            <li>
              See if your Internet connection settings are being detected. You can set Microsoft Windows to examine your network and automatically discover network connection settings.
            </li>
            <li>
              Some sites require 128-bit connection security. Click the <strong>Help</strong> menu and then click <strong>About Internet Explorer</strong> to determine what strength security you have installed.
            </li>
          </ul>

          <p className="mt-5 font-bold text-xs text-black">
            HTTP 500 - Internal Server Error<br />
            Internet Explorer
          </p>
        </div>
      </div>
    </div>
  );
}

// My Computer High-Fidelity Retro Placeholder
function MyComputerWindow() {
  const openWindow = useDesktopStore((state) => state.openWindow);

  const handleDiskClick = () => {
    openWindow({
      id: 'portfolio-folder',
      name: "Prasun's Portfolio",
      iconPath: '/icons/folder.svg',
      type: 'folder',
      componentName: 'PortfolioFolder',
    });
  };

  return (
    <div className="flex h-full bg-[#f1efe7] font-sans text-xs">
      {/* Left Tasks Pane */}
      <div className="w-[180px] bg-gradient-to-b from-[#748cbd] to-[#4d669c] p-2.5 flex flex-col gap-3 overflow-auto select-none shrink-0 border-r border-[#002e9a]">
        {/* System Tasks Section */}
        <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
          <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
            <span>System Tasks</span>
          </div>
          <div className="p-2 space-y-1 bg-[#eceef7]">
            <div className="text-[#002e9a] hover:underline cursor-pointer">View system information</div>
            <div className="text-[#002e9a] hover:underline cursor-pointer">Add or remove programs</div>
            <div className="text-[#002e9a] hover:underline cursor-pointer">Change a setting</div>
          </div>
        </div>

        {/* Other Places Section */}
        <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
          <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
            <span>Other Places</span>
          </div>
          <div className="p-2 space-y-1 bg-[#eceef7]">
            <div className="text-[#002e9a] hover:underline cursor-pointer">My Network Places</div>
            <div className="text-[#002e9a] hover:underline cursor-pointer">My Documents</div>
            <div className="text-[#002e9a] hover:underline cursor-pointer">Control Panel</div>
          </div>
        </div>
      </div>

      {/* Right Drive Explorer Grid */}
      <div className="flex-1 bg-white p-4 overflow-auto border-l border-white shadow-inner flex flex-col gap-4">
        {/* Group 1: Files Stored on This Computer */}
        <div>
          <div className="font-bold text-[#002e9a] border-b border-[#a6b8db] pb-1 mb-2.5">
            Files Stored on This Computer
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5 p-1 cursor-default hover:bg-[#e0ecf9] rounded border border-transparent hover:border-[#b8d6f7]">
              <img src="/icons/folder.svg" alt="" className="w-8 h-8" />
              <div>
                <div className="font-semibold text-black">Shared Documents</div>
                <div className="text-[#808080]">System Folder</div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2: Hard Disk Drives */}
        <div>
          <div className="font-bold text-[#002e9a] border-b border-[#a6b8db] pb-1 mb-2.5">
            Hard Disk Drives
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div 
              onDoubleClick={handleDiskClick}
              className="flex items-center gap-2.5 p-1 cursor-default hover:bg-[#e0ecf9] rounded border border-transparent hover:border-[#b8d6f7] select-none"
            >
              <img src="/icons/hard-drive.svg" alt="" className="w-8 h-8" />
              <div>
                <div className="font-semibold text-black">Local Disk (C:)</div>
                <div className="text-[#808080]">NTFS Partition</div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 3: Devices with Removable Storage */}
        <div>
          <div className="font-bold text-[#002e9a] border-b border-[#a6b8db] pb-1 mb-2.5">
            Devices with Removable Storage
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5 p-1 opacity-60 cursor-not-allowed select-none">
              <img src="/icons/floppy.svg" alt="" className="w-8 h-8" />
              <div>
                <div className="font-semibold text-black">3½ Floppy (A:)</div>
                <div className="text-[#808080]">Removable Disk</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-1 opacity-60 cursor-not-allowed select-none">
              <img src="/icons/cd-rom.svg" alt="" className="w-8 h-8" />
              <div>
                <div className="font-semibold text-black">CD Drive (D:)</div>
                <div className="text-[#808080]">Optical Drive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Recycle Bin High-Fidelity Retro Placeholder
function RecycleBinWindow() {
  return (
    <div className="flex h-full bg-[#f1efe7] font-sans text-xs">
      {/* Left Tasks Pane */}
      <div className="w-[180px] bg-gradient-to-b from-[#748cbd] to-[#4d669c] p-2.5 flex flex-col gap-3 overflow-auto select-none shrink-0 border-r border-[#002e9a]">
        <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
          <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
            <span>Recycle Bin Tasks</span>
          </div>
          <div className="p-2 space-y-1 bg-[#eceef7]">
            <div className="text-[#808080] cursor-not-allowed">Empty the Recycle Bin</div>
            <div className="text-[#808080] cursor-not-allowed">Restore all items</div>
          </div>
        </div>

        <div className="bg-white rounded-t-md overflow-hidden border border-[#d6d6d6] shadow-sm">
          <div className="bg-gradient-to-r from-[#8ba7de] to-[#4f7bc6] text-white font-bold p-1.5 flex justify-between items-center text-[11px] shadow-sm">
            <span>Other Places</span>
          </div>
          <div className="p-2 space-y-1 bg-[#eceef7]">
            <div className="text-[#002e9a] hover:underline cursor-pointer">My Computer</div>
            <div className="text-[#002e9a] hover:underline cursor-pointer">My Documents</div>
          </div>
        </div>
      </div>

      {/* Right Grid Pane */}
      <div className="flex-1 bg-white p-4 overflow-auto border-l border-white shadow-inner flex flex-col items-center justify-center text-center">
        <img 
          src="/icons/recycle-bin.svg" 
          alt="Recycle Bin empty" 
          className="w-16 h-16 mb-2 opacity-30 select-none" 
          draggable={false}
        />
        <div className="text-[#808080] text-sm">The Recycle Bin is empty.</div>
      </div>
    </div>
  );
}

export default function WindowManager() {
  const openWindows = useDesktopStore((state) => state.openWindows);

  // Content Router
  const renderWindowContent = (win) => {
    if (win.type === 'file') {
      return <MarkdownViewer windowId={win.id} />;
    }
    if (win.type === 'pdf') {
      return (
        <div className="w-full h-full bg-[#808080] flex flex-col font-sans select-none">
          {/* Simulated PDF toolbar or just simple browser iframe */}
          <div className="flex justify-between items-center px-3 py-1 bg-[#ece9d8] border-b border-[#d0ccbf] text-black text-xs shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold">Adobe Reader</span>
              <span className="text-[#808080]">|</span>
              <span className="truncate max-w-[250px]">{win.title}</span>
            </div>
            <div>
              <a
                href="/api/download-resume"
                download="tech_Resume_exp_Prasun.pdf"
                className="px-2 py-0.5 border border-[#808080] hover:bg-white bg-[#ece9d8] text-black font-semibold rounded-sm shadow-xs flex items-center gap-1 text-[11px] no-underline"
              >
                💾 Download PDF
              </a>
            </div>
          </div>
          <div className="flex-1 bg-[#525659]">
            <iframe
              src={`${win.filePath || '/tech_Resume_exp_Prasun.pdf'}#toolbar=0&navpanes=0`}
              className="w-full h-full border-none"
              title={win.title}
            />
          </div>
        </div>
      );
    }
    if (win.id === 'portfolio-folder') {
      return <FolderExplorer folderId={win.id} />;
    }
    if (win.id === 'my-computer') {
      return <MyComputerWindow />;
    }
    if (win.id === 'recycle-bin') {
      return <RecycleBinWindow />;
    }
    if (win.id === 'internet-explorer') {
      return <InternetExplorerWindow />;
    }

    return (
      <div className="p-4 bg-white h-full flex flex-col items-center justify-center text-black font-sans text-xs">
        <div className="text-sm font-bold mb-1">{win.title}</div>
        <div>This system application content is not loaded.</div>
      </div>
    );
  };

  return (
    <>
      {openWindows.map((win) => {
        // If minimized, do not render (unmounted per instruction)
        if (win.isMinimized) {
          return null;
        }

        return (
          <WindowContainer key={win.id} win={win}>
            {renderWindowContent(win)}
          </WindowContainer>
        );
      })}
    </>
  );
}
