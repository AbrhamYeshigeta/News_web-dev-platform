import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '../data/articles';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface HeroSectionProps {
  onArticleClick: (articleId: string) => void;
  allArticles: Article[];
}

export default function HeroSection({ onArticleClick, allArticles }: HeroSectionProps) {
  const mainSliderArticles = useMemo(() => allArticles.slice(0, 5), [allArticles]);
  const sideSlider1Articles = useMemo(() => {
    return [allArticles[5], allArticles[7], allArticles[9], allArticles[11]].filter(Boolean);
  }, [allArticles]);
  const sideSlider2Articles = useMemo(() => {
    return [allArticles[6], allArticles[8], allArticles[10], allArticles[12], allArticles[13]].filter(Boolean);
  }, [allArticles]);
  const bottomRowArticles = useMemo(() => allArticles.slice(7, 11), [allArticles]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentIdx1, setCurrentIdx1] = useState(0);
  const [currentIdx2, setCurrentIdx2] = useState(0);

  const nextSlide = useCallback(() => {
    if (mainSliderArticles.length > 0) {
      setCurrentIdx((prev) => (prev + 1) % mainSliderArticles.length);
    }
  }, [mainSliderArticles]);

  const prevSlide = () => {
    if (mainSliderArticles.length > 0) {
      setCurrentIdx((prev) => (prev - 1 + mainSliderArticles.length) % mainSliderArticles.length);
    }
  };

  const nextSlide1 = useCallback(() => {
    if (sideSlider1Articles.length > 0) {
      setCurrentIdx1((prev) => (prev + 1) % sideSlider1Articles.length);
    }
  }, [sideSlider1Articles]);

  const prevSlide1 = () => {
    if (sideSlider1Articles.length > 0) {
      setCurrentIdx1((prev) => (prev - 1 + sideSlider1Articles.length) % sideSlider1Articles.length);
    }
  };

  const nextSlide2 = useCallback(() => {
    if (sideSlider2Articles.length > 0) {
      setCurrentIdx2((prev) => (prev + 1) % sideSlider2Articles.length);
    }
  }, [sideSlider2Articles]);

  const prevSlide2 = () => {
    if (sideSlider2Articles.length > 0) {
      setCurrentIdx2((prev) => (prev - 1 + sideSlider2Articles.length) % sideSlider2Articles.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide1();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide1]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide2();
    }, 12000);
    return () => clearInterval(timer);
  }, [nextSlide2]);

  const currentArticle = mainSliderArticles[currentIdx];
  const currentArticle1 = sideSlider1Articles[currentIdx1];
  const currentArticle2 = sideSlider2Articles[currentIdx2];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full min-h-[500px]">
        {/* Main Feature Slider - 2/3 width on desktop */}
        <div className="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentArticle.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => onArticleClick(currentArticle.id)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt={currentArticle.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-accent-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 w-fit shadow-xl shadow-accent-blue/30">
                    {currentArticle.category}
                  </span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-black text-white italic leading-[0.95] tracking-tighter mb-4 drop-shadow-2xl"
                >
                  {currentArticle.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 text-xs md:text-base lg:text-lg line-clamp-2 max-w-2xl font-medium leading-relaxed"
                >
                  {currentArticle.excerpt}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 mt-6 text-[10px] font-black text-white/50 uppercase tracking-[0.25em]"
                >
                  <Clock className="w-4 h-4 text-accent-green" />
                  {currentArticle.date}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls - Top Right Cluster */}
          <div className="absolute top-6 right-6 lg:top-10 lg:right-10 flex flex-col gap-4 z-20 items-end">
            {/* Dots */}
            <div className="flex gap-1.5">
              {mainSliderArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIdx === idx ? "w-8 bg-accent-blue" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            
            {/* Arrow Buttons */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all shadow-xl group/btn"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all shadow-xl group/btn"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Stack - 1/3 width on desktop */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-4">
          {/* Side Slider 1 (Top right) */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentArticle1.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => onArticleClick(currentArticle1.id)}
              >
                <img 
                  src={currentArticle1.imageUrl} 
                  alt={currentArticle1.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <span className="inline-block px-2.5 py-0.5 bg-accent-green/20 backdrop-blur-md text-accent-green text-[10px] font-black uppercase tracking-widest rounded-md mb-2 shadow-sm w-fit">
                    {currentArticle1.category}
                  </span>
                  <h3 className="text-lg lg:text-xl font-black text-white leading-snug uppercase italic line-clamp-2 mb-3">
                    {currentArticle1.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    {currentArticle1.date}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls for Side Slider 1 */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 items-end">
              {/* Dots */}
              <div className="flex gap-1 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                {sideSlider1Articles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentIdx1(idx); }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentIdx1 === idx ? "w-4 bg-accent-green" : "w-1 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              
              {/* Arrow Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide1(); }}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all shadow-md group/btn"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-0.5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide1(); }}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all shadow-md group/btn"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Slider 2 (Bottom right) */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentArticle2.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => onArticleClick(currentArticle2.id)}
              >
                <img 
                  src={currentArticle2.imageUrl} 
                  alt={currentArticle2.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <span className="inline-block px-2.5 py-0.5 bg-accent-blue/20 backdrop-blur-md text-accent-blue text-[10px] font-black uppercase tracking-widest rounded-md mb-2 shadow-sm w-fit">
                    {currentArticle2.category}
                  </span>
                  <h3 className="text-lg lg:text-xl font-black text-white leading-snug uppercase italic line-clamp-2 mb-3">
                    {currentArticle2.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    {currentArticle2.date}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls for Side Slider 2 */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 items-end">
              {/* Dots */}
              <div className="flex gap-1 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                {sideSlider2Articles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentIdx2(idx); }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentIdx2 === idx ? "w-4 bg-accent-blue" : "w-1 bg-white/44 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              
              {/* Arrow Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide2(); }}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all shadow-md group/btn"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-0.5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide2(); }}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all shadow-md group/btn"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Featured Row - Horizontal Scroll on Mobile */}
      <div className="mt-8">
        <div className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {bottomRowArticles.map((article, idx) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-card-bg border border-ui-border rounded-2xl p-4 flex flex-col gap-4 group cursor-pointer hover:border-accent-blue/40 transition-all hover:shadow-2xl hover:-translate-y-1 snap-start"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="aspect-video rounded-xl overflow-hidden relative shadow-inner">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-[0.15em] rounded-md mb-2 w-fit">
                  {article.category}
                </span>
                <h4 className="text-sm font-black text-text-primary leading-tight uppercase tracking-tight line-clamp-2 group-hover:text-accent-blue transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-[9px] font-bold text-text-muted uppercase tracking-widest pt-1">
                  <Clock className="w-3.5 h-3.5 opacity-50" />
                  {article.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

