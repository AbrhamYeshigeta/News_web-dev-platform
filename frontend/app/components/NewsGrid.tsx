'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import Image from 'next/image';

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

  // Main hero article
  const heroArticle: Article = {
    id: 'hero-1',
    category: 'ቴክኖሎጂ',
    categoryColor: 'text-white',
    categoryBg: 'bg-blue-500 rounded-full',
    title: 'አፕል በ iOS 19 ውስጥ አብዮታዊ የ AI ባህሪያትን ይፋ አደረገ',
    description: 'አዲሱ ዝመና በሁሉም ቤተኛ መተግበሪያዎች ውስጥ የጄኔሬቲቭ ሞዴሎችን ጥልቅ ውህደት ያመጣል።',
    imageUrl: 'https://picsum.photos/1200/800?random=11', // placeholder image
    timeAgo: 'ከ 3 ሰዓታት በፊት'
  };

  // Two secondary articles (Top-Right)
  const secondaryArticles: Article[] = [
    {
      id: 'sec-1',
      category: 'ጤና',
      categoryColor: 'text-emerald-400',
      categoryBg: 'bg-transparent',
      title: 'ያልተጠበቀው የስትሮውበሪ የጤና ጠቀሜታ እና ድንቅ ባህሪዎች',
      imageUrl: 'https://picsum.photos/1200/800?random=21', // placeholder image
      timeAgo: 'ከ 4 ሰዓታት በፊት'
    },
    {
      id: 'sec-2',
      category: 'ቴክኖሎጂ',
      categoryColor: 'text-teal-400',
      categoryBg: 'bg-transparent',
      title: 'የሊቲየም-አየር ባትሪዎች የኮምፒውተሮችን እና የኤሌክትሪክ መኪኖችን እድሜ ሊያራዝሙ ይችላሉ',
      imageUrl: 'https://picsum.photos/1200/800?random=22', // placeholder image
      timeAgo: 'ከ 1 ቀን በፊት'
    }
  ];

  // Bottom 4 articles
  const bottomArticles: Article[] = [
    {
      id: 'bot-1',
      category: 'ዓለም አቀፍ',
      categoryColor: 'text-sky-600 border border-sky-200',
      categoryBg: 'bg-sky-50',
      title: 'የአለም መሪዎች በአዲሱ የአየር ንብረት ጥበቃ ስምምነት ላይ በይፋ ተስማሙ',
      imageUrl: 'https://picsum.photos/1200/800?random=23', // placeholder image
      timeAgo: '2 ቀን በፊት'
    },
    {
      id: 'bot-2',
      category: 'ስፖርት',
      categoryColor: 'text-indigo-600 border border-indigo-200',
      categoryBg: 'bg-indigo-50',
      title: 'የመጪው ኦሊምፒክ ዝግጅት በክለቦች እና በሀገራት ደረጃ በከፍተኛ ሁኔታ እየተከናወነ ነው',
      imageUrl: 'https://picsum.photos/1200/800?random=24', // placeholder image
      timeAgo: '6 ሰዓት በፊት'
    },
    {
      id: 'bot-3',
      category: 'ጤና',
      categoryColor: 'text-emerald-600 border border-emerald-200',
      categoryBg: 'bg-emerald-50',
      title: 'የአእምሮ ጤና መታወክ ችግሮች በወጣቶች ላይ ያላቸው ተጋላጭነት በከፍተኛ መጠን እየጨመረ ነው',
      imageUrl: 'https://picsum.photos/1200/800?random=25', // placeholder image
      timeAgo: '10 ሰዓት በፊት'
    },
    {
      id: 'bot-4',
      category: 'ተፈጥሮ',
      categoryColor: 'text-amber-600 border border-amber-200',
      categoryBg: 'bg-amber-50',
      title: 'የዱር እንስሳት መኖሪያዎችን እና የተፈጥሮ አካባቢዎችን ለመጠበቅ አዳዲስ መንገዶች ተፈለጉ',
      imageUrl: 'https://picsum.photos/1200/800?random=26', // placeholder image
      timeAgo: '8 ሰዓት በፊት'
    }
  ];

  // Filtering helper
  const filterPass = (article: Article) => {
    if (selectedCategory === 'ሁሉም') return true;
    return article.category === selectedCategory;
  };

  const isHeroVisible = filterPass(heroArticle);
  const visibleSecondaries = secondaryArticles.filter(filterPass);
  const visibleBottoms = bottomArticles.filter(filterPass);

  const hasAnyArticles = isHeroVisible || visibleSecondaries.length > 0 || visibleBottoms.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Grid: Hero (Left) and 2 Stacked (Right) */}
      {selectedCategory === 'ሁሉም' && (
        <div className="grid grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-12 mb-10">
          
          {/* Main Hero Card (Wider) */}
          <div className="group relative overflow-hidden rounded-[32px] bg-slate-950 shadow-xl lg:col-span-8 aspect-[4/3] lg:aspect-auto lg:h-[500px]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={heroArticle.imageUrl}
                alt={heroArticle.title}
                className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>
            
            {/* Top Right Carousel Controls */}
            <div className="absolute top-8 right-8 flex flex-col items-end gap-3 z-20">
              <div className="flex gap-1.5 items-center px-2 py-1">
                <div className="h-1 w-5 bg-blue-500 rounded-full"></div>
                <div className="h-1 w-1.5 bg-white/40 rounded-full"></div>
                <div className="h-1 w-1.5 bg-white/40 rounded-full"></div>
                <div className="h-1 w-1.5 bg-white/40 rounded-full"></div>
              </div>
              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded bg-black/60 text-white/80 hover:bg-black/80 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded bg-black/60 text-white/80 hover:bg-black/80 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-10">
              <div className="space-y-4 max-w-2xl">
                <div>
                  <span className={`inline-block ${heroArticle.categoryBg} ${heroArticle.categoryColor} px-4 py-1 text-xs font-black tracking-wider`}>
                    {heroArticle.category}
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-white leading-[1.1] tracking-wide font-serif italic">
                  {heroArticle.title}
                </h1>
                
                <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed font-sans opacity-90 line-clamp-2">
                  {heroArticle.description}
                </p>
                
                <div className="flex items-center gap-2 text-slate-300/80 text-xs font-bold">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>{heroArticle.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Horizontal Scroller of Secondary Cards */}
          <div className="lg:col-span-4 h-auto lg:h-[500px]">
            <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-300/10">
              {secondaryArticles.map((art) => (
                <div
                  key={art.id}
                  className="snap-start min-w-[320px] lg:min-w-[340px] group relative flex-1 overflow-hidden rounded-3xl bg-slate-950 shadow-lg"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <div className="space-y-2.5">
                      <div>
                        <span className={`inline-block ${art.categoryBg} ${art.categoryColor} text-xs font-black tracking-wider`}>
                          {art.category}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-white leading-tight line-clamp-2 tracking-wide font-serif italic">
                        {art.title}
                      </h2>

                      <div className="flex items-center gap-1.5 text-slate-300/80 text-xs font-bold">
                        <Clock className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{art.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Category Header Selector (Moved here) */}
      <div className="border-b border-slate-100 pb-5 mb-6 mt-16 lg:mt-20">

        {/* Scrolling Category List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex items-center gap-1.5 shrink-0 rounded-full px-4 py-2 text-xs font-black tracking-wide transition-all ${
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
      {hasAnyArticles ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Categorized rendering mode */}
          {selectedCategory !== 'ሁሉም' && isHeroVisible && (
            <ArticleCard article={heroArticle} />
          )}
          {selectedCategory !== 'ሁሉም' && visibleSecondaries.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
          
          {/* Always display bottom articles matching filter */}
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
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300">
      {/* Aspect Ratio Container for clean image resizing */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
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
