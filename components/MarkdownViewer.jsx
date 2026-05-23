'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function MarkdownViewer({ windowId }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/content/${windowId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Document not found');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setContent(`# Document Error\n\nUnable to load the file \`/content/${windowId}.md\`. Please ensure it exists.`);
        setLoading(false);
      });
  }, [windowId]);

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.wordpad-content');
    if (!element) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: [15, 15, 15, 15],
        filename: `${windowId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] font-sans text-xs select-none">
      {/* WordPad Menu Bar */}
      <div className="flex gap-4 px-2.5 py-1 border-b border-[#d0ccbf] bg-[#ece9d8] text-black">
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 cursor-default rounded-sm">File</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 cursor-default rounded-sm">Edit</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 cursor-default rounded-sm">View</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 cursor-default rounded-sm">Insert</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 cursor-default rounded-sm">Format</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 cursor-default rounded-sm">Help</span>
      </div>

      {/* WordPad Action Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-[#d0ccbf] bg-[#ece9d8]">
        <button className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center font-bold">
          📁 <span className="ml-1 font-normal scale-90">Open</span>
        </button>
        <button 
          onClick={handleDownloadPDF}
          className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center font-bold"
        >
          💾 <span className="ml-1 font-normal scale-90">Save</span>
        </button>
        <button 
          onClick={handleDownloadPDF}
          className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center font-bold"
        >
          🖨️ <span className="ml-1 font-normal scale-90">Print</span>
        </button>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center">
          ✂️ <span className="ml-1 scale-90">Cut</span>
        </button>
        <button className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center">
          📋 <span className="ml-1 scale-90">Copy</span>
        </button>
        <button className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center">
          📄 <span className="ml-1 scale-90">Paste</span>
        </button>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center">
          ↩️ <span className="ml-1 scale-90">Undo</span>
        </button>
        <button className="px-1.5 py-1 border border-transparent hover:border-[#808080] active:border-white flex items-center font-bold">
          📅 <span className="ml-1 font-normal scale-90">Date</span>
        </button>
      </div>

      {/* WordPad Formatting Toolbar */}
      <div className="flex items-center gap-1.5 p-1 border-b border-[#d0ccbf] bg-[#ece9d8]">
        <select disabled className="px-1 py-0.5 border border-[#7f9db9] bg-white h-[20px] outline-none text-xs w-[120px]">
          <option>Times New Roman</option>
        </select>
        <select disabled className="px-1 py-0.5 border border-[#7f9db9] bg-white h-[20px] outline-none text-xs w-[50px]">
          <option>10</option>
        </select>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button disabled className="px-1.5 py-0.5 border border-transparent font-bold">B</button>
        <button disabled className="px-1.5 py-0.5 border border-transparent italic">I</button>
        <button disabled className="px-1.5 py-0.5 border border-transparent underline">U</button>
        <span className="w-[1px] h-4 bg-[#d0ccbf] mx-1" />
        <button disabled className="px-1.5 py-0.5 border border-transparent text-left">≡</button>
        <button disabled className="px-1.5 py-0.5 border border-transparent text-center">≡</button>
        <button disabled className="px-1.5 py-0.5 border border-transparent text-right">≡</button>
      </div>

      {/* WordPad Ruler Bar */}
      <div className="h-[18px] border-b border-[#a0a0a0] bg-[#ece9d8] flex items-center relative select-none pl-6 text-[8px] text-gray-600 shrink-0">
        <div className="absolute left-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#7f7f7f] bottom-0" />
        <div className="absolute left-[300px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#7f7f7f] bottom-0" />
        {/* Tick marks */}
        <div className="flex gap-[25px] mt-1 pl-4">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
        </div>
      </div>

      {/* WordPad Canvas (Scrollable Workspace) */}
      <div className="flex-1 overflow-auto bg-[#808080] p-4 select-text">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-white font-bold">
            Loading document...
          </div>
        ) : (
          /* Sheet of Paper */
          <div className="w-full max-w-[760px] mx-auto min-h-[95%] bg-white border border-[#404040] shadow-[3px_3px_5px_rgba(0,0,0,0.5)]">
            <article className="wordpad-content prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>

      {/* WordPad Status Bar */}
      <div className="status-bar shrink-0 flex justify-between select-none">
        <div className="status-bar-field flex-1">For Help, click Help on the Menu Bar.</div>
        <div className="status-bar-field w-[100px] text-center">NUM</div>
      </div>
    </div>
  );
}
