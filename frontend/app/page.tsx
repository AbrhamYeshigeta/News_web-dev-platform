'use client';

import React from 'react';
import Navbar from './components/Navbar';
import BreakingNewsMarquee from './components/BreakingNewsMarquee';
import MainHeader from './components/MainHeader';
import NewsGrid from './components/NewsGrid';
import AdvertiseBanner from './components/AdvertiseBanner';
import BusinessNewsSection from './components/BusinessNewsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFD] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. TOP HEADER NAVIGATION */}
      <Navbar />

      {/* 2. INFINITELY SCROLLING BREAKING NEWS TICKER */}
      <BreakingNewsMarquee />

      {/* 3. MAIN HERO HEADER */}
      <MainHeader />

      {/* 4. HERO / DYNAMIC INTERACTIVE FILTERING BAR */}
      <main className="flex-grow">
        
        {/* 5. PREMIUM NEWS CARDS GRID SECTION */}
        <NewsGrid />

        {/* 5. ADVERTISE BANNER */}
        <AdvertiseBanner />

        {/* 6. BUSINESS NEWS SECTION */}
        <BusinessNewsSection />

      </main>

      {/* 7. ELEGANT MODERN FOOTER */}
      <Footer />

    </div>
  );
}
