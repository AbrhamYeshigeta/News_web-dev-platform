import { useEffect } from "react";
import Navbar from "./components/Navbar";
import BreakingTicker from "./components/BreakingTicker";
import HeroSection from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import FeaturedGrid from "./components/FeaturedGrid";
import Sidebar from "./components/Sidebar";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import NewsDetail from "./components/NewsDetail";
import PromotionBoard from "./components/PromotionBoard";
import { Article } from "./data/articles";
import { Clock, ArrowLeft } from "lucide-react";

import { useNewsStore, useUiStore } from "./store";

export default function App() {
  const {
    articlesList,
    selectedCategory,
    searchQuery,
    selectedArticle,
    setArticlesList,
    setSelectedCategory,
    setSearchQuery,
    setSelectedArticle,
    getFilteredArticles,
    getIsHome,
  } = useNewsStore();

  const { isAdminView, setIsAdminView } = useUiStore();

  // Auto-scroll to top when article or category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedArticle, selectedCategory]);

  const isHome = getIsHome();
  const filteredArticles = getFilteredArticles();

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // if (isAdminView) {
  //   return (
  //     <AdminDashboard
  //       articles={articlesList}
  //       setArticles={setArticlesList}
  //       onClose={() => setIsAdminView(false)}
  //     />
  //   );
  // }

  return (
    <div className="min-h-screen bg-page-bg text-text-primary">
      <Navbar
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onAdminClick={() => setIsAdminView(true)}
      />
      <BreakingTicker />

      <main>
        {selectedArticle ? (
          <NewsDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
          />
        ) : isHome ? (
          <>
            <HeroSection
              allArticles={articlesList}
              onArticleClick={(id) =>
                setSelectedArticle(
                  articlesList.find((a) => a.id === id) || null,
                )
              }
            />
            <CategoryFilter
              activeCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <FeaturedGrid
              allArticles={articlesList}
              onArticleClick={handleArticleClick}
            />

            <div className="container mx-auto px-4 lg:px-8 py-8">
              <PromotionBoard
                title="የተሻለ የንባብ ልምድ"
                description="የቲክቫ አፕሊኬሽንን በማውረድ ፈጣን እና ቀልጣፋ የዜና አገልግሎት ያግኙ።"
                ctaText="አሁኑኑ ይጫኑ"
                imageUrl="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200"
                theme="black"
              />
            </div>

            {/* Main Content + Sidebar Row */}
            <section className="container mx-auto px-4 lg:px-8 py-10 border-t border-ui-border">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Editor's Picks - 70% content area */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-text-primary">
                      <span className="w-1 h-5 bg-accent-blue"></span> የተመረጡ
                      ዜናዎች
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articlesList.slice(0, 4).map((article) => (
                      <article
                        key={article.id}
                        className="flex flex-col gap-4 group cursor-pointer border border-ui-border p-4 rounded-xl hover:bg-card-bg transition-all hover:shadow-xl hover:shadow-slate-200/50"
                        onClick={() => handleArticleClick(article)}
                      >
                        <div className="w-full aspect-video rounded-lg overflow-hidden border border-ui-border">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 bg-accent-green/10 text-accent-green text-[10px] font-bold uppercase tracking-widest rounded-md mb-2 w-fit">
                            {article.category}
                          </span>
                          <h3 className="text-base font-bold leading-tight group-hover:text-accent-blue transition-colors text-text-primary">
                            {article.title}
                          </h3>
                          <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mt-2">
                            {article.excerpt}...
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Sidebar - 30% area */}
                <div className="lg:col-span-4">
                  <Sidebar />
                </div>
              </div>
            </section>

            {/* Category Sections */}

            <div className="container mx-auto px-4 lg:px-8 py-10">
              <PromotionBoard
                title="የቢዝነስ ስልጠና"
                description="የራሳችሁን ስኬታማ ቢዝነስ ለመጀመር የሚያግዙ ሚስጥሮችን እና ስልጠናዎችን ከባለሙያዎች ያግኙ።"
                ctaText="ተጨማሪ ያንብቡ"
                imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                type="banner"
                theme="gold"
              />
            </div>

            <CategorySection
              title="ስፖርት"
              articles={articlesList.filter((a) => a.category === "ስፖርት")}
              onArticleClick={handleArticleClick}
            />
          </>
        ) : (
          <div className="animate-in fade-in duration-500">
            <CategoryFilter
              activeCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="container mx-auto px-4 lg:px-8 py-12">
              <button
                onClick={() => setSelectedCategory("HOME")}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-primary mb-8 transition-colors"
                id="back-to-home-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                ወደ መነሻ ተመለስ
              </button>

              <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic text-text-primary">
                  {selectedCategory}
                </h1>
                <div className="h-1 w-24 bg-accent-blue" />
              </div>

              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <article
                      key={article.id}
                      className="flex flex-col gap-4 group cursor-pointer border border-ui-border p-6 rounded-2xl bg-card-bg/50 hover:bg-card-bg transition-all hover:shadow-xl hover:shadow-slate-200/50"
                      onClick={() => handleArticleClick(article)}
                      id={`article-${article.id}`}
                    >
                      <div className="aspect-video rounded-xl overflow-hidden border border-ui-border">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="inline-block px-2.5 py-0.5 bg-accent-green/10 text-accent-green text-[10px] font-bold uppercase tracking-widest rounded-md w-fit">
                          {article.category}
                        </span>
                        <h2 className="text-xl font-bold leading-tight text-text-primary group-hover:text-accent-blue transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-sm text-text-muted line-clamp-4 leading-relaxed">
                          {article.excerpt}...
                        </p>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-ui-border text-[10px] font-bold text-text-muted uppercase">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.date}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border border-ui-border rounded-3xl border-dashed">
                  <p className="text-text-muted uppercase font-bold tracking-widest">
                    በዚህ ምድብ ምንም ዜና አልተገኘም።
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
