import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, WeeklyPlan, ShoppingList } from '@/types'

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
  
  currentWeekPlan: WeeklyPlan | null
  setCurrentWeekPlan: (plan: WeeklyPlan | null) => void
  
  currentShoppingList: ShoppingList | null
  setCurrentShoppingList: (list: ShoppingList | null) => void
  
  selectedCity: string
  setSelectedCity: (city: string) => void
  
  selectedEquipment: string[]
  setSelectedEquipment: (equipment: string[]) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      
      currentWeekPlan: null,
      setCurrentWeekPlan: (plan) => set({ currentWeekPlan: plan }),
      
      currentShoppingList: null,
      setCurrentShoppingList: (list) => set({ currentShoppingList: list }),
      
      selectedCity: '',
      setSelectedCity: (city) => set({ selectedCity: city }),
      
      selectedEquipment: [],
      setSelectedEquipment: (equipment) => set({ selectedEquipment: equipment }),
    }),
    {
      name: 'dailycuisine-storage',
      partialize: (state) => ({
        user: state.user,
        selectedCity: state.selectedCity,
        selectedEquipment: state.selectedEquipment,
      }),
    }
  )
)
