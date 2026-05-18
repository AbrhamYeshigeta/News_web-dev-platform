import { create } from 'zustand';
import { UserSlice, createUserSlice } from './slices/userSlice';
import { UiSlice, createUiSlice } from './slices/uiSlice';

type StoreState = UserSlice & UiSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createUiSlice(...a),
}));
