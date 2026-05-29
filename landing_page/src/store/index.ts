import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, articles } from '../data/articles';

// ----------------------------------------------------
// 1. NEWS STORE
// State management for news lists, category selections, searching, and reading detail
// ----------------------------------------------------
interface NewsState {
  articlesList: Article[];
  selectedCategory: string;
  searchQuery: string;
  selectedArticle: Article | null;
  setArticlesList: (articles: Article[] | ((prev: Article[]) => Article[])) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedArticle: (article: Article | null) => void;
  getFilteredArticles: () => Article[];
  getIsHome: () => boolean;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  articlesList: articles,
  selectedCategory: 'HOME',
  searchQuery: '',
  selectedArticle: null,

  setArticlesList: (updater) => set((state) => {
    const nextArticles = typeof updater === 'function' ? updater(state.articlesList) : updater;
    return { articlesList: nextArticles };
  }),

  setSelectedCategory: (category) => set({ 
    selectedCategory: category,
    selectedArticle: null 
  }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedArticle: (article) => set({ selectedArticle: article }),

  getFilteredArticles: () => {
    const { selectedCategory, searchQuery, articlesList } = get();
    const isHomeCat = selectedCategory === 'ሁሉም ዜና' || selectedCategory === 'ሁሉም ዜናዎች' || selectedCategory === 'HOME';
    
    let list = isHomeCat 
      ? articlesList 
      : articlesList.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());
      
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.excerpt.toLowerCase().includes(query)
      );
    }
    
    return list;
  },

  getIsHome: () => {
    const { selectedCategory, searchQuery } = get();
    return (selectedCategory === 'ሁሉም ዜና' || selectedCategory === 'ሁሉም ዜናዎች' || selectedCategory === 'HOME') && searchQuery === '';
  }
}));

// ----------------------------------------------------
// 2. BOOKMARK STORE (LocalStorage Persisted)
// Reader bookmarking management
// ----------------------------------------------------
interface BookmarkState {
  bookmarkedIds: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      
      addBookmark: (id) => set((state) => ({
        bookmarkedIds: [...state.bookmarkedIds.filter(x => x !== id), id]
      })),
      
      removeBookmark: (id) => set((state) => ({
        bookmarkedIds: state.bookmarkedIds.filter(x => x !== id)
      })),
      
      toggleBookmark: (id) => set((state) => {
        const index = state.bookmarkedIds.indexOf(id);
        if (index > -1) {
          return { bookmarkedIds: state.bookmarkedIds.filter(x => x !== id) };
        } else {
          return { bookmarkedIds: [...state.bookmarkedIds, id] };
        }
      }),
      
      isBookmarked: (id) => {
        return get().bookmarkedIds.includes(id);
      }
    }),
    {
      name: 'newsflow-bookmark-store',
    }
  )
);

// ----------------------------------------------------
// 3. REACTION STORE (Likes, Insightful, Saves, Reports)
// Client optimistic reactions tracker
// ----------------------------------------------------
interface ReactionCounts {
  likes: number;
  insightful: number;
  saved: number;
  reported: number;
  userReaction?: 'like' | 'insightful' | 'save' | 'report' | null;
}

interface ReactionState {
  reactions: Record<string, ReactionCounts>;
  addReaction: (articleId: string, type: 'like' | 'insightful' | 'save' | 'report') => void;
  getArticleReactions: (articleId: string) => ReactionCounts;
}

export const useReactionStore = create<ReactionState>((set, get) => ({
  reactions: {},

  addReaction: (articleId, type) => set((state) => {
    const current = state.reactions[articleId] || { likes: 12, insightful: 4, saved: 7, reported: 0, userReaction: null };
    const next = { ...current };
    
    // If user clicks the exact same reaction, undo it
    if (current.userReaction === type) {
      if (type === 'like') next.likes = Math.max(0, next.likes - 1);
      if (type === 'insightful') next.insightful = Math.max(0, next.insightful - 1);
      if (type === 'save') next.saved = Math.max(0, next.saved - 1);
      if (type === 'report') next.reported = Math.max(0, next.reported - 1);
      next.userReaction = null;
    } else {
      // If user had a prior reaction, undo that one first
      if (current.userReaction) {
        const prevType = current.userReaction;
        if (prevType === 'like') next.likes = Math.max(0, next.likes - 1);
        if (prevType === 'insightful') next.insightful = Math.max(0, next.insightful - 1);
        if (prevType === 'save') next.saved = Math.max(0, next.saved - 1);
        if (prevType === 'report') next.reported = Math.max(0, next.reported - 1);
      }
      
      // Apply the new reaction
      if (type === 'like') next.likes += 1;
      if (type === 'insightful') next.insightful += 1;
      if (type === 'save') next.saved += 1;
      if (type === 'report') next.reported += 1;
      next.userReaction = type;
    }

    return {
      reactions: {
        ...state.reactions,
        [articleId]: next
      }
    };
  }),

  getArticleReactions: (articleId) => {
    return get().reactions[articleId] || { likes: 15, insightful: 3, saved: 6, reported: 0, userReaction: null };
  }
}));

// ----------------------------------------------------
// 4. USER STORE (Auth, Preferences Role Based Access)
// User settings & profile preferences
// ----------------------------------------------------
interface UserProfile {
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'JOURNALIST' | 'READER';
}

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  preferences: {
    theme: 'light' | 'dark';
    compactMode: boolean;
  };
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  toggleCompactMode: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        email: 'abrhamaynu@gmail.com',
        name: 'አብርሃም አይኑ',
        role: 'ADMIN'
      },
      
      setUser: (user) => set({ user }),
      
      preferences: {
        theme: 'dark',
        compactMode: false
      },
      
      setTheme: (theme) => set((state) => ({
        preferences: { ...state.preferences, theme }
      })),
      
      toggleTheme: () => set((state) => ({
        preferences: {
          ...state.preferences,
          theme: state.preferences.theme === 'light' ? 'dark' : 'light'
        }
      })),
      
      toggleCompactMode: () => set((state) => ({
        preferences: {
          ...state.preferences,
          compactMode: !state.preferences.compactMode
        }
      }))
    }),
    {
      name: 'newsflow-user-store',
    }
  )
);

// ----------------------------------------------------
// 5. UI STORE (Mobile menu, layout, modal toggles)
// Global interface layouts and navigation components state
// ----------------------------------------------------
interface UiState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;
  adminTab: 'overview' | 'articles' | 'comments';
  setAdminTab: (tab: 'overview' | 'articles' | 'comments') => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  
  isAdminView: false,
  setIsAdminView: (isAdmin) => set({ isAdminView: isAdmin }),
  
  adminTab: 'overview',
  setAdminTab: (tab) => set({ adminTab: tab }),
}));
