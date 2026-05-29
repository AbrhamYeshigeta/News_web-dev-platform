import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, articles as defaultArticles } from '../data/articles';

// ── News Store ──────────────────────────────────────────────────────────────
interface NewsState {
  articlesList: Article[];
  setArticlesList: (articles: Article[] | ((prev: Article[]) => Article[])) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  articlesList: defaultArticles,
  setArticlesList: (updater) =>
    set((state) => ({
      articlesList:
        typeof updater === 'function' ? updater(state.articlesList) : updater,
    })),
}));

// ── User Store (persisted) ───────────────────────────────────────────────────
interface UserProfile {
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'JOURNALIST' | 'READER';
}

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        email: 'abrhamaynu@gmail.com',
        name: 'አብርሃም አይኑ',
        role: 'ADMIN',
      },
      setUser: (user) => set({ user }),
    }),
    { name: 'newsflow-admin-user' }
  )
);

// ── UI Store ─────────────────────────────────────────────────────────────────
type AdminTab = 'overview' | 'articles' | 'comments' | 'employees' | 'sponsors' | 'media';

interface UiState {
  isAdminView: boolean;
  adminTab: AdminTab;
  setIsAdminView: (val: boolean) => void;
  setAdminTab: (tab: AdminTab) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isAdminView: true,
  adminTab: 'overview',
  setIsAdminView: (val) => set({ isAdminView: val }),
  setAdminTab: (tab) => set({ adminTab: tab }),
}));
