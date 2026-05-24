'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

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

export default function BusinessNewsSection() {
  // All articles from NewsGrid
  const articles: Article[] = [
    {
      id: 'hero-1',
      category: 'ቴክኖሎጂ',
      categoryColor: 'text-white',
      categoryBg: 'bg-blue-500 rounded-full',
      title: 'አፕል በ iOS 19 ውስጥ አብዮታዊ የ AI ባህሪያትን ይፋ አደረገ',
      description: 'አዲሱ ዝመና በሁሉም ቤተኛ መተግበሪያዎች ውስጥ የጄኔሬቲቭ ሞዴሎችን ጥልቅ ውህደት ያመጣል።',
      imageUrl: '/images/Apple_ios.jpg',
      timeAgo: 'ከ 3 ሰዓታት በፊት'
    },
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
    },
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
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 mb-16">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h2 className="mt-3 text-4xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            ቢዝነስ
          </h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
          ሙሉውን ይመልከቱ
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <div key={article.id} className="group flex flex-col bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300">
            {/* Image Container - restored to 4:3 */}
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-60"></div>
            </div>
            
            {/* Content Section */}
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
        ))}
      </div>
    </div>
  );
}
