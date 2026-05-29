import { useState } from 'react';
import { Newspaper, Twitter, Facebook, Send, Mail, MapPin, ChevronDown, Globe, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState('አማርኛ');

  const languages = ['አማርኛ', 'English', 'Afaan Oromoo', 'ትግርኛ', 'Somali'];

  return (
    <footer className="bg-[#050505] text-white mt-24 pt-20 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Social Section */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue/50 text-white shadow-lg shadow-accent-blue/20 group-hover:scale-105 transition-transform duration-300">
                  <Newspaper className="h-9 w-9" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight uppercase leading-tight text-gray-400 font-['Abyssinica_SIL']">Ethiopia</span>
                </div>
              </div>
              
              <p className="text-sm font-medium tracking-wide italic text-gray-500 max-w-sm leading-relaxed">
                "እውነትና ተስፋ ለኢትዮጵያ"
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">ከእኛ ጋር ይገናኙ</h3>
              <div className="flex gap-4">
                {[
                  { icon: Twitter, color: 'hover:bg-[#1DA1F2]' },
                  { icon: Send, color: 'hover:bg-[#0088cc]' },
                  { icon: Facebook, color: 'hover:bg-[#1877F2]' }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className={cn(
                      "w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/5 group",
                      social.color
                    )}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
              
              <div className="space-y-4 text-sm font-medium text-gray-400 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                    <Mail className="w-4 h-4 text-gray-500 group-hover:text-accent-blue" />
                  </div>
                  <span className="group-hover:text-white transition-colors">info@tikvahethiopia.com</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                    <MapPin className="w-4 h-4 text-gray-500 group-hover:text-accent-green" />
                  </div>
                  <span className="group-hover:text-white transition-colors">Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-10">
            {/* News Categories */}
            <div className="space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2">
                <span className="w-1.5 h-4 bg-accent-blue rounded-full"></span>
                የዜና ዘርፎች
              </h3>
              <ul className="space-y-4 text-[13px] font-bold text-gray-400">
                {[
                  'ሰበር ዜና', 'ፖለቲካዊ', 'ቢዝነስ', 'ኢኮኖሚ', 
                  'ቴክኖሎጂ', 'ትምህርት', 'ጤና', 'ስፖርት', 'መዝናኛ'
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-all hover:pl-2 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-accent-blue"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Extended Nav */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-600">ድርጅቱ</h3>
                <ul className="space-y-4 text-[13px] font-bold text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">ስለ እኛ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ራዕያችን</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ተልኳችን</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">የስራ ዕድል</a></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-600">ህግና ደንብ</h3>
                <ul className="space-y-4 text-[13px] font-bold text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">ግላዊነት ፖሊሲ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ውሎችና ሁኔታዎች</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ኩኪ ፖሊሲ</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interaction & Tools Area */}
          <div className="lg:col-span-3 space-y-12">
            {/* Language Selection */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-600">የቋንቋ አማራጮች</h3>
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-accent-blue group-hover:rotate-12 transition-transform" />
                    <span>{lang}</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isLangOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 w-full mb-3 bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 p-2"
                    >
                      {languages.map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setLang(l);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors",
                            lang === l ? "bg-accent-blue text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {l}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-600">ለዜና መጽሔት ይመዝገቡ</h3>
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="የኢሜል አድራሻዎን ያስገቡ" 
                    className="w-full h-14 px-5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold"
                  />
                  <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent-blue transition-colors" />
                </div>
                <button className="w-full h-14 bg-accent-blue text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-accent-blue/90 transition-all active:scale-[0.98] shadow-lg shadow-accent-blue/20 flex items-center justify-center gap-2 group">
                  መረጃ አግኝ
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Support Links */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <a href="#" className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-center hover:bg-white/10 hover:border-white/10 transition-all">አግኙን</a>
              <a href="#" className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-center hover:bg-white/10 hover:border-white/10 transition-all">ማስታወቂያ</a>
            </div>
          </div>
        </div>

        {/* Deep Footer */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em]">
            © {currentYear} Tikvah Ethiopia Media Group. ሁሉም መብቶች የተጠበቁ ናቸው።
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
