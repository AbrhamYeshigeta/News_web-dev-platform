'use client';

import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-slate-300 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Logo & Brand */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-black flex-shrink-0">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2.757-1.351a1 1 0 00-.943 0L14 7m6 0l-2.757 1.351a1 1 0 00-.943 0L8 7m6 0v2.5M8 7L5.243 5.649a1 1 0 00-.943 0L2 7m6 0v2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TIKVAH</h3>
                <p className="text-white text-sm">ETHIOPIA</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              ኢትዮጵያ ተከላ ኢ,ተድኮዮ
            </p>

            {/* Follow Us */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm5.894 8.221l-.724 11.447h-2.561l.821-11.447h2.464zm-5.893 0l.722 11.447H8.969L8.246 8.221h2.755zm5.893 0h2.464l-.722 11.447h-2.561l.819-11.447z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
                <span className="text-xs text-slate-400">info@tikvahethiopia.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
                <span className="text-xs text-slate-400">Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Column 2: News Sections */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">News Sections</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Breaking News</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Politics</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Business</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Economy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Education</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Health</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Sports</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Entertainment</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Our Vision</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Column 5: Support & Newsletter */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm">Support</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Advertise with Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Submit News</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Report an Issue</a></li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-700 text-white text-xs placeholder-slate-500 rounded focus:outline-none focus:bg-slate-600 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-12">
          <p className="text-center text-xs text-slate-500">
            © 2026 Tikvah Ethiopia. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
