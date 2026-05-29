import { Heart, Bookmark, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../data/articles';

interface FeaturedGridProps {
  onArticleClick: (article: Article) => void;
  allArticles: Article[];
}

export default function FeaturedGrid({ onArticleClick, allArticles }: FeaturedGridProps) {
  const worldArticles = allArticles.filter(a => a.category === 'ዓለም-አቀፍ');
  const displayArticles = worldArticles.length > 0 ? worldArticles.slice(0, 4) : allArticles.slice(0, 4);

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-text-primary">
          ዓለም-አቀፍ ዜናዎች
          <span className="w-12 h-1 bg-accent-blue" />
        </h2>
        <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors group">
          ሁሉንም አሳይ
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayArticles.map((article) => (
          <article 
            key={article.id} 
            onClick={() => onArticleClick(article)}
            className="group cursor-pointer flex flex-col gap-2"
          >
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-ui-border group-hover:border-accent-blue/30 transition-all duration-300">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute top-2 right-2 p-2 bg-page-bg/80 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Bookmark className="w-3 h-3 text-text-primary" />
              </span>
            </div>

            <span className="inline-block px-2.5 py-0.5 bg-accent-green/10 text-accent-green text-[10px] font-bold uppercase tracking-widest rounded-md w-fit">
              {article.category}
            </span>
            <h4 className="text-sm font-bold leading-snug line-clamp-2 text-text-primary group-hover:text-accent-blue transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mt-1">
              {article.excerpt}...
            </p>
            <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase font-bold tracking-widest mt-2">
              {article.date}
            </div>
          </article>
        ))}
      </div>
      
    </section>
  );
}
