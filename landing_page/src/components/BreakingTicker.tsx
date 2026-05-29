import { motion } from 'motion/react';

const headlines = [
  "ዓለም አቀፉ የአየር ንብረት ጉባኤ ታሪካዊ የካርበን ገለልተኝነት ስምምነት ላይ ደረሰ",
  "የቴክኖሎጂ ኩባንያዎች በአውሮፓ ህብረት አዲስ የቁጥጥር ፈተናዎች ገጥሟቸዋል",
  "የማርስ ሮቨር የጥንት ወንዞች ፍሰት ማስረጃዎችን አገኘ",
  "የአክሲዮን ገበያዎች በኢኮኖሚ ማገገሚያ ወቅት ከፍተኛ ደረጃ ላይ ደርሰዋል"
];

export default function BreakingTicker() {
  return (
    <div className="h-9 bg-accent-red flex items-center overflow-hidden whitespace-nowrap">
      <div className="bg-black/20 h-full flex items-center px-4 font-black italic text-xs md:text-sm uppercase tracking-widest shadow-lg text-white">
        ሰበር ዜና
      </div>
      
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div className="animate-marquee h-full flex items-center">
          {[...headlines, ...headlines].map((headline, index) => (
            <span 
              key={index} 
              className="px-8 text-xs md:text-sm font-bold text-white transition-colors cursor-pointer whitespace-nowrap italic"
            >
              • {headline}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
