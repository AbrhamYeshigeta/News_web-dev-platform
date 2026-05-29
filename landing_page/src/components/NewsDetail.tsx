import { ArrowLeft, Clock, Share2, Twitter, Facebook, Bookmark, Calendar, Heart, Sparkles, AlertTriangle } from 'lucide-react';
import { Article } from '../data/articles';
import { useBookmarkStore, useReactionStore } from '../store';

interface NewsDetailProps {
  article: Article;
  onBack: () => void;
}

export default function NewsDetail({ article, onBack }: NewsDetailProps) {
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const { addReaction, getArticleReactions } = useReactionStore();

  const bookmarked = isBookmarked(article.id);
  const reactions = getArticleReactions(article.id);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-ui-border z-50">
        <div className="h-full bg-accent-blue w-2/3 shadow-[0_0_10px_#2563eb]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-primary mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          ወደ ዋናው ተመለስ
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <div className="mb-10">
              <span className="inline-block px-3 py-1 bg-accent-blue text-[10px] font-black uppercase tracking-widest rounded-sm mb-6 text-white">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-text-primary mb-8 italic text-slate-100">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-ui-border">
                <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    ግንቦት 04, 2018
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime || '5 ደቂቃ በፊት'}
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-ui-border shadow-2xl shadow-slate-200">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="space-y-8 text-lg text-text-muted leading-relaxed font-medium">
              <p className="text-xl text-slate-200 font-bold first-letter:text-5xl first-letter:font-black first-letter:text-accent-blue first-letter:mr-3 first-letter:float-left">
                {article.excerpt} ኢንዱስትሪውን ለዘላለም ሊቀርጽ በሚችል ጉልህ እርምጃ፣ ባለሙያዎች ይህ ልማት የአዲስ ዘመን መጀመሪያ መሆኑን ይናገራሉ። የሁኔታው ውስብስብነት በአካባቢውም ሆነ በዓለም አቀፍ ገበያዎች ላይ ከፍተኛ ተጽዕኖ ይኖረዋል።
              </p>
              
              <p className="text-slate-300">
                ሁኔታው መሻሻሉን ሲቀጥል፣ ባለድርሻ አካላት እያንዳንዱን ትንሽ ለውጥ በቅርበት እየተከታተሉ ነው። ወደፊት መሰናክሎች ቢኖሩም፣ በአጠቃላይ አመራሩ ዘንድ ያለው ስሜት በጥንቃቄ የተሞላ ብሩህ ተስፋ ነው። "ይህ በፖሊሲ ላይ የሚደረግ ለውጥ ብቻ ሳይሆን፣ የምንሰራበትን መሠረት የሚቀይር ነው" ሲሉ በፕሮጀክቱ ውስጥ የተሳተፉ ከፍተኛ ተንታኝ ገልጸዋል።
              </p>

              <div className="bg-card-bg border-l-4 border-accent-blue p-8 rounded-r-2xl my-10 animate-in slide-in-from-left duration-700">
                <blockquote className="text-slate-100 italic text-2xl font-bold leading-snug">
                  "ዛሬ እዚህ የተደረጉት ውሳኔዎች ለትውልድ በታሪክ ውስጥ ይስተጋባሉ። በዓለም አቀፍ ደረጃ መሠረታዊ ለውጥ እየተመለከትን ነው።"
                </blockquote>
                <cite className="block mt-4 text-xs font-black uppercase tracking-widest text-accent-blue">— ይፋዊ መግለጫ</cite>
              </div>

              <h2 className="text-2xl font-black text-slate-100 uppercase italic tracking-tight pt-4">የወደፊት እይታ</h2>
              
              <p className="text-slate-300">
                ሰፊ ምርምር እንደሚያመለክተው የረጅም ጊዜ ጥቅሞቹ ፈጣን ወጪዎችን ሊበልጡ ይችላሉ። ሆኖም፣ ተቺዎች የአተገባበር የጊዜ ሰሌዳው በጣም ጠንካራ ሊሆን እንደሚችል ይከራከራሉ። የታቀዱት እርምጃዎች እንደተጠበቀው ውጤት መስጠታቸውን ለመወሰን የሚቀጥሉት ወራት ወሳኝ ይሆናሉ።
              </p>

              <div className="grid grid-cols-2 gap-4 py-8">
                <div className="h-48 rounded-2xl bg-card-bg border border-ui-border overflow-hidden">
                   <img src={`https://picsum.photos/seed/${article.id}extra1/600/400`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity animate-pulse" />
                </div>
                <div className="h-48 rounded-2xl bg-card-bg border border-ui-border overflow-hidden">
                   <img src={`https://picsum.photos/seed/${article.id}extra2/600/400`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <p className="text-slate-300">
                ለማጠቃለል ያህል፣ ተግዳሮቶች ቢቀጥሉም፣ የመንገድ ካርታው ግልጽ ነው። የመጀመሪያዎቹ የአተገባበር ደረጃዎች በሚቀጥለው ሳምንት ሲጀምሩ ኢንዱስትሪው በጉጉት እየጠበቀ ነው።
              </p>
            </div>

            {/* Interactive Readers Reactions Dashboard */}
            <div className="mt-12 bg-slate-900 border border-ui-border p-6 rounded-3xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-accent-blue mb-4 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-accent-blue inline-block"></span> የአንባቢዎች አስተያየት (Reader Reactions)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button 
                  onClick={() => addReaction(article.id, 'like')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 h-12 rounded-xl text-xs font-bold transition-all border ${
                    reactions.userReaction === 'like' 
                      ? 'bg-red-500/10 border-red-500/35 text-red-400 font-extrabold scale-95 shadow-sm shadow-red-500/10'
                      : 'bg-page-bg border-ui-border text-text-muted hover:text-red-400 hover:border-red-500/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${reactions.userReaction === 'like' ? 'fill-current text-red-500' : ''}`} />
                  ወድጃለሁ ({reactions.likes})
                </button>

                <button 
                  onClick={() => addReaction(article.id, 'insightful')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 h-12 rounded-xl text-xs font-bold transition-all border ${
                    reactions.userReaction === 'insightful' 
                      ? 'bg-amber-500/10 border-amber-500/35 text-amber-400 font-extrabold scale-95 shadow-sm shadow-amber-500/10'
                      : 'bg-page-bg border-ui-border text-text-muted hover:text-amber-400 hover:border-amber-500/20'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${reactions.userReaction === 'insightful' ? 'fill-current text-amber-500' : ''}`} />
                  ጠቃሚ ነው ({reactions.insightful})
                </button>

                <button 
                  onClick={() => toggleBookmark(article.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 h-12 rounded-xl text-xs font-bold transition-all border ${
                    bookmarked 
                      ? 'bg-accent-blue/10 border-accent-blue/35 text-accent-blue font-extrabold scale-95 shadow-sm shadow-accent-blue/10'
                      : 'bg-page-bg border-ui-border text-text-muted hover:text-accent-blue hover:border-accent-blue/20'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-accent-blue' : ''}`} />
                  አስቀምጥ ({reactions.saved + (bookmarked ? 1 : 0)})
                </button>

                <button 
                  onClick={() => addReaction(article.id, 'report')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 h-12 rounded-xl text-xs font-bold transition-all border ${
                    reactions.userReaction === 'report' 
                      ? 'bg-orange-500/10 border-orange-500/35 text-orange-400 font-extrabold scale-95 shadow-sm shadow-orange-500/10'
                      : 'bg-page-bg border-ui-border text-text-muted hover:text-orange-400 hover:border-orange-500/20'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  ያልተገባ ({reactions.reported})
                </button>
              </div>
            </div>

            {/* Tags & Interaction */}
            <div className="mt-12 pt-10 border-t border-ui-border flex items-center justify-between">
              <div className="flex gap-2">
                {['ትንታኔ', article.category, 'ተለይቶ የቀረበ'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-card-bg border border-ui-border rounded-full text-[10px] font-black uppercase text-text-muted hover:text-text-primary hover:border-accent-blue cursor-pointer transition-all">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-3 bg-card-bg border border-ui-border rounded-full text-text-muted hover:text-accent-blue hover:border-accent-blue transition-all" title="share">
                   <Share2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-card-bg border border-ui-border rounded-3xl p-8 sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-widest text-accent-blue mb-8 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent-blue"></span> በማህበራዊ ሚዲያ አጋራ
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <button className="w-full h-12 flex items-center justify-center gap-3 bg-[#1da1f2]/10 text-[#1da1f2] border border-[#1da1f2]/20 rounded-xl font-bold transition-all hover:bg-[#1da1f2] hover:text-white">
                  <Twitter className="w-5 h-5" />
                  በ X አጋራ
                </button>
                <button className="w-full h-12 flex items-center justify-center gap-3 bg-[#4267b2]/10 text-[#4267b2] border border-[#4267b2]/20 rounded-xl font-bold transition-all hover:bg-[#4267b2] hover:text-white">
                  <Facebook className="w-5 h-5" />
                  በፌስቡክ አጋራ
                </button>
                <button 
                  onClick={() => toggleBookmark(article.id)}
                  className={`w-full h-12 flex items-center justify-center gap-3 rounded-xl font-bold border transition-all ${
                    bookmarked 
                      ? 'bg-accent-blue text-white border-accent-blue shadow-lg shadow-accent-blue/15'
                      : 'bg-ui-border/20 text-text-muted border-ui-border hover:bg-ui-border/40 hover:text-text-primary'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  {bookmarked ? 'ከተቀመጡት አስወግድ' : 'ዜናውን አስቀምጥ'}
                </button>
              </div>

              <div className="mt-12">
                 <h3 className="text-sm font-black uppercase tracking-widest text-accent-blue mb-6 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent-blue"></span> ይመዝገቡ
                </h3>
                <div className="p-6 bg-page-bg border border-ui-border rounded-2xl">
                  <p className="text-xs font-bold text-text-muted mb-4 leading-relaxed italic">
                    የNewsFlow አባል በመሆን ገለልተኛ ጋዜጠኝነትን ይደግፉ።
                  </p>
                  <button className="w-full py-3 bg-accent-green text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-lg shadow-accent-green/20 active:scale-95 transition-all">
                    የፕሪሚየም አገልግሎት ያግኙ - በወር $1
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
