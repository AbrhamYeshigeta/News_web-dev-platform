import { ExternalLink, Sparkles, Megaphone } from 'lucide-react';
import { motion } from 'motion/react';

interface PromotionBoardProps {
  title: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  type?: 'banner' | 'card' | 'minimal';
  theme?: 'blue' | 'black' | 'gold';
}

export default function PromotionBoard({ 
  title, 
  description, 
  ctaText, 
  imageUrl, 
  type = 'banner',
  theme = 'blue'
}: PromotionBoardProps) {
  
  const themeStyles = {
    blue: 'from-blue-600 to-indigo-700 text-white',
    black: 'from-slate-800 to-black text-white',
    gold: 'from-amber-500 to-amber-700 text-white'
  };

  if (type === 'minimal') {
    return (
      <div className={`border border-ui-border rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group bg-gradient-to-br ${themeStyles[theme]} shadow-lg`}>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Megaphone className="w-12 h-12" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80">
          <Sparkles className="w-3 h-3 text-white" />
          Sponsored
        </div>
        <div className="relative z-10">
          <h4 className="text-xl font-black text-white mb-2 leading-tight uppercase tracking-tight drop-shadow-sm">{title}</h4>
          <p className="text-xs text-white/90 font-medium leading-relaxed line-clamp-2">{description}</p>
        </div>
        <button className="flex items-center justify-between px-4 py-3 bg-white text-black rounded-lg text-xs font-black uppercase tracking-widest group-hover:bg-slate-100 transition-colors shadow-sm">
          {ctaText}
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 group ${type === 'banner' ? 'h-64' : 'h-80'}`}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles[theme]} opacity-85 transition-opacity group-hover:opacity-90`} />
      
      <div className="relative h-full flex flex-col justify-center px-8 md:px-12 max-w-2xl">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4 text-white/90 drop-shadow-sm">
          <Megaphone className="w-3 h-3" />
          Promotion
        </div>
        <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-[0.9] italic text-white drop-shadow-md">
          {title}
        </h3>
        <p className="text-sm md:text-lg text-white/95 mb-6 font-medium leading-relaxed max-w-lg drop-shadow-sm">
          {description}
        </p>
        <div className="flex items-center gap-4">
          <button className="px-8 py-3.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-opacity-95 transition-all flex items-center gap-2 group/btn shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            {ctaText}
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
      
      {/* Decorative pulse element */}
      <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-white opacity-40 animate-ping" />
    </motion.div>
  );
}
