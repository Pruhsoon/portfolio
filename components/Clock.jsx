'use client';

import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      
      const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${strMinutes} ${ampm}`;
    };

    // Set initial time
    setTimeStr(formatTime(new Date()));

    // Update time every 10 seconds to keep it fresh without heavy polling
    const interval = setInterval(() => {
      setTimeStr(formatTime(new Date()));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Return non-breaking space if not mounted yet to keep height/layout stable
  if (!timeStr) {
    return <span className="select-none text-[11px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  }

  return (
    <span className="select-none text-[11px] font-sans font-normal text-white">
      {timeStr}
    </span>
  );
}
