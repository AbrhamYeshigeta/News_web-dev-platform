'use client';

import React from 'react';

export default function AdvertiseBanner() {
  return (
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
  );
}
