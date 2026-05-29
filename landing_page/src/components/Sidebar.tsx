import { Mail } from 'lucide-react';
import { trendingArticles } from '../data/articles';
import PromotionBoard from './PromotionBoard';

export default function Sidebar() {
  return (
    <aside className="space-y-12">
      {/* Trending Now */}
      <div className="bg-card-bg border border-ui-border rounded-xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-6 flex items-center gap-2">
          <span className="w-1 h-4 bg-accent-blue"></span> በአሁኑ ጊዜ በመታየት ላይ
        </h3>
        <div className="space-y-6 text-black">
          {trendingArticles.map((article, index) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="flex gap-4 items-start">
                <span className="text-3xl font-black text-black group-hover:text-black/80 transition-colors leading-none pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight line-clamp-2 text-black group-hover:text-black/85 transition-colors">
                    {article.title}
                  </p>
                  <p className="text-[10px] text-black/75 mt-1.5 line-clamp-2 leading-relaxed">
                    {article.excerpt}...
                  </p>
                </div>
              </div>
              {index < trendingArticles.length - 1 && (
                <div className="border-b border-ui-border mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Promotion */}
      <PromotionBoard 
        type="minimal"
        title="ፕሪሚየም አባልነት"
        description="ለየት ያሉ ቪዲዮዎችን እና ጥልቅ ዘገባዎችን ለማግኘት አሁኑኑ ይመዝገቡ።"
        ctaText="ይቀላቀሉ"
        imageUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
      />

      {/* Newsletter */}
      <div className="bg-card-bg border border-ui-border rounded-xl p-6 relative overflow-hidden group">
        <div className="relative z-10">
          <Mail className="w-8 h-8 mb-4 text-accent-green" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2">የዜና መጽሔት</h3>
          <p className="text-sm font-bold text-text-primary mb-6">
            የጠዋት ወቅታዊ ዜናዎችን በኢሜልዎ ያግኙ።
          </p>
          <div className="flex gap-0 shadow-xl shadow-accent-green/20">
            <input 
              type="email" 
              placeholder="የኢሜል አድራሻ" 
              className="flex-1 h-10 px-3 bg-page-bg border border-ui-border text-xs rounded-l focus:outline-none focus:border-accent-blue/50 transition-all placeholder:text-text-muted/40"
            />
            <button className="h-10 bg-accent-green px-4 text-xs font-black uppercase tracking-tighter rounded-r text-white hover:bg-accent-green/90 transition-colors">
              ይቀላቀሉ
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
