'use client';

import React from 'react';
import Navbar from './components/Navbar';
import BreakingNewsMarquee from './components/BreakingNewsMarquee';
import NewsGrid from './components/NewsGrid';
import { Mail, ArrowRight, Rss, Star, Compass, Users, Newspaper } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFD] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. TOP HEADER NAVIGATION */}
      <Navbar />

      {/* 2. INFINITELY SCROLLING BREAKING NEWS TICKER */}
      <BreakingNewsMarquee />

      {/* 3. HERO / DYNAMIC INTERACTIVE FILTERING BAR */}
      <main className="flex-grow">
        
        {/* 4. PREMIUM NEWS CARDS GRID SECTION */}
        <NewsGrid />

        {/* 5. ADVERTISE BANNER */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mb-12">
          <div className="relative overflow-hidden rounded-[32px] bg-slate-950 shadow-xl h-[280px] sm:h-[320px]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
                alt="Advertise background"
                className="h-full w-full object-cover object-center brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
            </div>

            <div className="absolute inset-0 flex items-center p-8 sm:p-12 md:p-16 z-10">
              <div className="max-w-2xl">
                {/* ADVERTISE Tag */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-widest text-white/80 uppercase">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M21 13a6 6 0 100-12" />
                  </svg>
                  <span>ADVERTISE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-serif italic tracking-wide mt-3 mb-4">
                  የተሻለ የንባብ ልምድ
                </h2>

                <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed font-sans opacity-90 max-w-md mb-8">
                  የቴክኖሎጂ አፕሊኬሽን በማውረድ ፈጣን እና የተሟላ የዜና አገልግሎት ያግኙ።
                </p>

                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-md hover:bg-slate-50 transition-all cursor-pointer">
                  አሁን ይሞክሩ
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>

            {/* Preview Pill on Right Side */}
            <div className="absolute top-1/2 right-[15%] transform -translate-y-1/2 z-10 hidden md:block">
               <div className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-5 py-2 text-xs font-bold text-white tracking-wider cursor-pointer hover:bg-black/60 transition-colors">
                 Preview
               </div>
            </div>
          </div>
        </div>

      </main>

      {/* 6. ELEGANT MODERN FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 mb-12">
            
            {/* Column 1: Info and Brand */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m-6 4h3" />
                  </svg>
                </div>
                <span className="font-outfit text-xl font-extrabold tracking-tight text-white">
                  NEWS<span className="text-blue-500">FLOW</span>
                </span>
              </div>
              
              <p className="text-slate-400 text-xs sm:text-[13px] font-medium leading-relaxed font-sans max-w-sm">
                ፈጣን፣ ታማኝ እና ሚዛናዊ የዜና ዘገባዎችን በመላው አለም ለሚገኙ ተደራሲያን በአማርኛ ቋንቋ የሚያቀርብ ቀዳሚው ዲጂታል ሚዲያ ነው።
              </p>
              
              {/* Social Tags */}
              <div className="flex items-center gap-3.5 pt-2">
                <a href="#" className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Rss className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Star className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Compass className="h-4 w-4" />
                </a>
                <a href="#" className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Users className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-wider text-slate-200 uppercase">ምድቦች</h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">ሀገር አቀፍ ዜናዎች</a></li>
                <li><a href="#" className="hover:text-white transition-colors">የአለም አቀፍ ዘገባዎች</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ሳይንስና ቴክኖሎጂ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ቢዝነስና ኢኮኖሚ</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-wider text-slate-200 uppercase">ድርጅታችን</h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">ስለ እኛ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">የአርትዖት መርሆዎች</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ማስታወቂያ ለማስነገር</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ስራ እድሎች</a></li>
              </ul>
            </div>

            {/* Column 4: Help */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-wider text-slate-200 uppercase">እገዛና ድጋፍ</h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">በፖስታ ያግኙን</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ተደጋግመው የሚነሱ ጥያቄዎች</a></li>
                <li><a href="#" className="hover:text-white transition-colors">የግል አጠቃቀም መብት</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ውል እና ግዴታዎች</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-900/60 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} NEWSFLOW. መብቱ በህግ የተጠበቀ ነው።
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">የአጠቃቀም ስምምነት</a>
              <a href="#" className="hover:text-slate-400">የግላዊነት ፖሊሲ</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
