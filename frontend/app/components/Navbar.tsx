'use client';

import React, { useState } from 'react';
import { ChevronDown, Search, Menu, X, User, Bell, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { name: 'HOME', path: '/', dropdown: false },
    { 
      name: 'CONTACT', 
      path: '#', 
      dropdown: true,
      subItems: [
        { label: 'በፖስታ አድራሻ', desc: 'የዋናው መስሪያ ቤት ፖስታ' },
        { label: 'የስልክ መስመር', desc: 'ቀጥታ የስልክ ጥሪ ቁጥር' },
        { label: 'ማህበራዊ ሚዲያ', desc: 'ፌስቡክ፣ ቴሌግራም እና ኤክስ' }
      ]
    },
    { 
      name: 'ABOUT', 
      path: '#', 
      dropdown: true,
      subItems: [
        { label: 'ስለ እኛ', desc: 'የድርጅቱ ታሪክ እና ራዕይ' },
        { label: 'የአርትዖት መርህ', desc: 'የዜና አዘጋገብ ስርዓታችን' },
        { label: 'ስራ አስኪያጆች', desc: 'የቦርድ አባላት እና አመራሮች' }
      ]
    },
    { 
      name: 'FEATURES', 
      path: '#', 
      dropdown: true,
      subItems: [
        { label: 'ሀገር አቀፍ ዜናዎች', desc: 'ከሰላሳ በላይ ክልሎች የተሰባሰቡ' },
        { label: 'የምርመራ ጋዜጠኝነት', desc: 'በጥልቀት የተጠኑ ዘገባዎች' },
        { label: 'የፎቶ ዘገባ', desc: 'የአለም እውነታዎች በምስል' }
      ]
    },
    { 
      name: 'NEWSLETTER', 
      path: '#', 
      dropdown: true,
      subItems: [
        { label: 'ዕለታዊ ዜና', desc: 'በየቀኑ ጠዋት የሚላክ' },
        { label: 'የሳምንቱ አጋማሽ', desc: 'የትንታኔ እና የባለሙያ አስተያየት' }
      ]
    },
    { 
      name: 'ADVERTISE', 
      path: '#', 
      dropdown: true,
      subItems: [
        { label: 'የማስታወቂያ ዋጋዎች', desc: 'በድር ጣቢያችን ላይ ማስታወቂያ' },
        { label: 'የስፖንሰርሺፕ አማራጮች', desc: 'ለረጅም ጊዜ አጋርነት' }
      ]
    },
    { 
      name: 'HELP', 
      path: '#', 
      dropdown: true,
      subItems: [
        { label: 'ተደጋግመው የሚነሱ ጥያቄዎች', desc: 'FAQ' },
        { label: 'የደንበኞች ድጋፍ', desc: '24/7 የቴክኒክ እገዛ' }
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m-6 4h3" />
              </svg>
            </div>
            <span className="font-outfit text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              NEWS<span className="text-blue-600">FLOW</span>
            </span>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.name === 'HOME' ? (
                <Link 
                  href={item.path} 
                  className="flex items-center rounded-lg bg-blue-50 px-3 py-2 text-[13px] font-bold tracking-wider text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-bold tracking-wider transition-colors duration-200 ${
                    activeDropdown === item.name 
                      ? 'bg-slate-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                </button>
              )}

              {/* Sub-menu dropdown with glassmorphic cards */}
              {item.dropdown && item.subItems && activeDropdown === item.name && (
                <div className="absolute left-0 mt-1 w-64 origin-top-left rounded-xl border border-slate-100 bg-white p-3 shadow-xl ring-1 ring-black/5 transition-all duration-200">
                  <div className="space-y-1">
                    {item.subItems.map((sub, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="block rounded-lg px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="text-[14px] font-semibold text-slate-800 font-sans">{sub.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{sub.desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
            LOGIN
          </button>
          
          <button className="rounded-xl bg-[#00BFA6] px-5 py-2 text-sm font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-[#00a892] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all">
            SUBSCRIBE
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU PANEL */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-lg">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="py-1">
                {item.dropdown ? (
                  <details className="group">
                    <summary className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 list-none cursor-pointer">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pl-6 pr-3 mt-1.5 space-y-1 border-l-2 border-slate-100 ml-3">
                      {item.subItems?.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.path}
                    className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700">
              LOGIN
            </button>
            <button className="w-full rounded-xl bg-[#00BFA6] py-2.5 text-sm font-bold text-white">
              SUBSCRIBE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
