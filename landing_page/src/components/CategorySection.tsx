import { ArrowRight, Clock } from 'lucide-react';
import { Article } from '../data/articles';

interface CategorySectionProps {
  title: string;
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export default function CategorySection({ title, articles, onArticleClick }: CategorySectionProps) {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 border-t border-ui-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-text-primary">
          {title}
          <span className="w-12 h-1 bg-accent-blue" />
        </h2>
        <a href="#" className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors group">
          ሁሉንም አሳይ
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((article) => (
          <div 
            key={article.id} 
            className="group cursor-pointer flex flex-col gap-2"
            onClick={() => onArticleClick(article)}
          >
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-ui-border group-hover:border-accent-blue/30 transition-all bg-card-bg">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="inline-block px-2.5 py-0.5 bg-accent-blue/10 text-accent-blue text-[10px] font-bold uppercase tracking-widest rounded-md w-fit">
              {article.category}
            </span>
            <h3 className="text-sm font-bold leading-tight line-clamp-2 text-text-primary group-hover:text-accent-blue transition-colors">
              {article.title}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mt-1">
              {article.excerpt}...
            </p>
            <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase font-bold tracking-widest mt-2">
              {article.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
