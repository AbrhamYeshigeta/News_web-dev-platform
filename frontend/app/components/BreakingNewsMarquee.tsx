'use client';

import React from 'react';

export default function BreakingNewsMarquee() {
  const headlines = [
    "ታሪካዊ የሰላም ስምምነት በደቡብ አፍሪካ ተፈረመ",
    "የቴክኖሎጂ ኩባንያዎች በአውሮፓ ህብረት አዲስ የቁጥጥር ህግጋት እየገጠሟቸው ነው",
    "ሞባይል ፎኖች በወጣቶች የዕለት ተዕለት ኑሮ ላይ ያላቸው ተፅዕኖ በከፍተኛ ደረጃ እያደገ ነው",
    "የአሜሪካን ምርጫ የዓለም አቀፍ ትኩረት አግኝቷል",
    "የአለም መሪዎች በታላቁ የአየር ንብረት ስምምነት ላይ ለመፈራረም ስምምነት ላይ ደርሰዋል"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#C00000] py-2.5 shadow-md flex items-center">
      {/* Label Badge */}
      <div className="absolute left-0 z-10 bg-[#E00000] px-4 py-2.5 text-xs font-black tracking-widest text-white shadow-[8px_0_12px_rgba(0,0,0,0.15)] flex items-center gap-1.5 shrink-0 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        ሰበር ዜና
      </div>

      {/* Marquee Wrapper */}
      <div className="w-full flex pl-28">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {/* Double up the array to make the infinite loop seamless */}
          {[...headlines, ...headlines].map((text, index) => (
            <span 
              key={index} 
              className="inline-flex items-center text-xs sm:text-[13px] font-bold text-white tracking-wide font-sans mr-12 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span className="text-amber-400 font-extrabold text-base mr-3">•</span>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
