import { useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  'ሁሉም ዜናዎች', 'ዓለም-አቀፍ', 'ቢዝነስ', 'ቴክኖሎጂ', 'ጤና', 'ሳይንስ', 'ስፖርት', 'መዝናኛ', 'ኢኮኖሚ', 'ባህል', 'ፖለቲካ'
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-ui-border bg-page-bg sticky top-16 z-40">
      <div className="container mx-auto px-4 lg:px-8 flex items-center relative gap-4 h-14">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-3 h-full"
        >
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border-b-2 h-full flex items-center mt-0.5",
                activeCategory === category || (activeCategory === 'HOME' && category === 'ሁሉም ዜናዎች') ? "border-accent-blue text-text-primary" : "border-transparent text-text-muted hover:text-text-primary uppercase"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="h-6 w-[1px] bg-ui-border mx-2" />

        {/* Search Bar - Integrated in the category row on the right */}
        <div className="relative flex items-center group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ፈልግ..." 
            className="w-48 xl:w-64 h-9 pl-10 pr-4 bg-card-bg border border-ui-border rounded-xl text-xs font-bold focus:outline-none focus:border-accent-blue/50 transition-all placeholder:text-text-muted/40 shadow-sm group-hover:shadow-md"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/40 group-focus-within:text-accent-blue transition-colors" />
        </div>
      </div>
    </div>
  );
}
