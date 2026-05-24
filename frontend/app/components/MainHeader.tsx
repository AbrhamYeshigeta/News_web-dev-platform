'use client';

import React from 'react';
import { Clock } from 'lucide-react';

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

export default function MainHeader() {
  const heroArticle: Article = {
    id: 'hero-1',
    category: 'ቴክኖሎጂ',
    categoryColor: 'text-white',
    categoryBg: 'bg-blue-500 rounded-full',
    title: 'አፕል በ iOS 19 ውስጥ አብዮታዊ የ AI ባህሪያትን ይፋ አደረገ',
    description: 'አዲሱ ዝመና በሁሉም ቤተኛ መተግበሪያዎች ውስጥ የጄኔሬቲቭ ሞዴሎችን ጥልቅ ውህደት ያመጣል።',
    imageUrl: '/images/Apple_ios.jpg',
    timeAgo: 'ከ 3 ሰዓታት በፊት'
  };

  const secondaryArticles: Article[] = [
    {
      id: 'sec-1',
      category: 'ጤና',
      categoryColor: 'text-emerald-400',
      categoryBg: 'bg-transparent',
      title: 'ያልተጠበቀው የስትሮውበሪ የጤና ጠቀሜታ እና ድንቅ ባህሪዎች',
      imageUrl: '/images/braib_headache.jpg',
      timeAgo: 'ከ 4 ሰዓታት በፊት'
    },
    {
      id: 'sec-2',
      category: 'ቴክኖሎጂ',
      categoryColor: 'text-teal-400',
      categoryBg: 'bg-transparent',
      title: 'የሊቲየም-አየር ባትሪዎች የኮምፒውተሮችን እና የኤሌክትሪክ መኪኖችን እድሜ ሊያራዝሙ ይችላሉ',
      imageUrl: '/images/mobileapp_poster.jpg',
      timeAgo: 'ከ 1 ቀን በፊት'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-8 lg:mt-12">
      <div className="grid grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-12 mb-6">
        {/* Main Hero Card (Wider) */}
        <div className="group relative overflow-hidden rounded-[32px] bg-slate-950 shadow-xl lg:col-span-8 aspect-4/3 lg:aspect-auto lg:h-[540px]">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroArticle.imageUrl}
              alt={heroArticle.title}
              className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          </div>

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

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-10">
            <div className="space-y-4 max-w-2xl">
              <div>
                <span className={`inline-block ${heroArticle.categoryBg} ${heroArticle.categoryColor} px-4 py-1 text-xs font-black tracking-wider`}>
                  {heroArticle.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[44px] font-black text-white leading-[1.05] tracking-wide font-serif italic">
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

        {/* Right Column Stacked Cards */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:col-span-4 lg:grid-rows-2 lg:h-[540px] lg:max-w-[380px] mx-auto">
          {secondaryArticles.map((art) => (
            <div key={art.id} className="group relative overflow-hidden rounded-[28px] bg-slate-950 shadow-lg aspect-4/3 w-full max-w-[380px] mx-auto">
              <div className="absolute inset-0 w-full h-full">
                <img src={art.imageUrl} alt={art.title} className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              </div>

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
  );
}
