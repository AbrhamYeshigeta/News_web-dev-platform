import { create } from 'zustand';
import type { Subscriber } from '@/types';

interface SubscriberState {
  subscribers: Subscriber[];
  setSubscribers: (subscribers: Subscriber[]) => void;
  removeSubscriber: (id: string) => void;
}

export const useSubscriberStore = create<SubscriberState>((set) => ({
  subscribers: [],
  setSubscribers: (subscribers) => set({ subscribers }),
  removeSubscriber: (id) =>
    set((state) => ({
      subscribers: state.subscribers.filter((s) => s.id !== id),
    })),
}));
