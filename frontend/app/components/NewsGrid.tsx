'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';
// Image optimization via next/image intentionally omitted here to match existing markup

interface Article {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  description?: string;
  imageUrl: string;
  timeAgo: string;
}

export default function NewsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('ሁሉም');

  const categories = [
    { label: 'ሁሉም', count: 7 },
    { label: 'ሀገር አቀፍ', count: 2 },
    { label: 'ዓለም አቀፍ', count: 1 },
    { label: 'ቴክኖሎጂ', count: 1 },
    { label: 'ስፖርት', count: 1 },
    { label: 'ጤና', count: 2 },
    { label: 'ሳይንስ', count: 1 },
    { label: 'ተፈጥሮ', count: 1 },
  ];

  // Bottom articles for the grid
  const bottomArticles: Article[] = [
    {
      id: 'bot-1',
      category: 'ዓለም አቀፍ',
      categoryColor: 'text-sky-600 border border-sky-200',
      categoryBg: 'bg-sky-50',
      title: 'የአለም መሪዎች በአዲሱ የአየር ንብረት ጥበቃ ስምምነት ላይ በይፋ ተስማሙ',
      imageUrl: '/images/World_governance.jpg',
      timeAgo: '2 ቀን በፊት'
    },
    {
      id: 'bot-2',
      category: 'ስፖርት',
      categoryColor: 'text-indigo-600 border border-indigo-200',
      categoryBg: 'bg-indigo-50',
      title: 'የመጪው ኦሊምፒክ ዝግጅት በክለቦች እና በሀገራት ደረጃ በከፍተኛ ሁኔታ እየተከናወነ ነው',
      imageUrl: '/images/olympics.jpg',
      timeAgo: '6 ሰዓት በፊት'
    },
    {
      id: 'bot-3',
      category: 'ጤና',
      categoryColor: 'text-emerald-600 border border-emerald-200',
      categoryBg: 'bg-emerald-50',
      title: 'የአእምሮ ጤና መታወክ ችግሮች በወጣቶች ላይ ያላቸው ተጋላጭነት በከፍተኛ መጠን እየጨመረ ነው',
      imageUrl: '/images/braib_headache.jpg',
      timeAgo: '10 ሰዓት በፊት'
    },
    {
      id: 'bot-4',
      category: 'ተፈጥሮ',
      categoryColor: 'text-amber-600 border border-amber-200',
      categoryBg: 'bg-amber-50',
      title: 'የዱር እንስሳት መኖሪያዎችን እና የተፈጥሮ አካባቢዎችን ለመጠበቅ አዳዲስ መንገዶች ተፈለጉ',
      imageUrl: '/images/wild_animals.jpg',
      timeAgo: '8 ሰዓት በፊት'
    },
    {
      id: 'bot-5',
      category: 'ሀገር አቀፍ',
      categoryColor: 'text-rose-600 border border-rose-200',
      categoryBg: 'bg-rose-50',
      title: 'መንግስት አዲስ ፖሊሲ አቀረበ ለከተማዎች የአገልግሎት ስርዓት ለማሻሻል',
      imageUrl: '/images/World_governance.jpg',
      timeAgo: '3 ሰዓታት በፊት'
    },
  ];

  const filterPass = (article: Article) => {
    if (selectedCategory === 'ሁሉም') return true;
    return article.category === selectedCategory;
  };

  const visibleBottoms = bottomArticles.filter(filterPass);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category Header Selector */}
      <div className="border-b border-slate-100 pb-5 mb-6 mt-8 lg:mt-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex items-center gap-1 shrink-0 rounded-full px-4 py-2 text-xs font-black tracking-wide transition-all ${
                selectedCategory === cat.label
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-100 hover:border-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
              <span className={`inline-flex items-center justify-center rounded-full h-4 min-w-4 px-1 text-[9px] font-black ${
                selectedCategory === cat.label ? 'bg-blue-500 text-white' : 'bg-slate-50 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Headline Title */}
      <div className="flex items-center justify-between pb-6 mb-2">
        <div className="flex items-center gap-4">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
            {selectedCategory === 'ሁሉም' ? 'አዳዲስ ዜናዎች' : `${selectedCategory} ዘገባዎች`}
          </h3>
          <div className="hidden sm:block h-1 w-16 bg-blue-600 rounded-full"></div>
        </div>
        <a href="#" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-xs sm:text-sm font-bold transition-colors">
          ሙሉውን ይዩ 
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>

      {/* Bottom Grid / Fallback Categorized Articles */}
      {visibleBottoms.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleBottoms.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="text-slate-400 text-sm font-semibold">
            በተመረጠው ምድብ ውስጥ ምንም ዜና አልተገኘም። እባክዎ ሌላ ምድብ ይምረጡ።
          </div>
        </div>
      )}
    </div>
  );

    
}

// Single Article Card Component for the Bottom Row
function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group flex flex-col bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300">
      {/* Aspect Ratio Container for clean image resizing - restored to 4:3 */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60"></div>
      </div>

      {/* Info Content Section */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div>
          <span className={`inline-block rounded-md ${article.categoryBg} ${article.categoryColor} px-2.5 py-0.5 text-[10px] font-black tracking-wide`}>
            {article.category}
          </span>
        </div>

        <h4 className="text-xs sm:text-[13px] font-extrabold text-slate-800 leading-normal line-clamp-3 group-hover:text-blue-600 tracking-wide font-sans transition-colors flex-1">
          {article.title}
        </h4>

        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold pt-1.5 border-t border-slate-50">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>{article.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
