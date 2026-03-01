import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/services/supabase'
import type { Dish, SearchHistory } from '@/types'

export function useSearch(userId?: string) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Dish[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [hotSearches, setHotSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedIngredient, setSelectedIngredient] = useState<string>('')

  const categories = ['肉类', '蛋类', '蔬菜', '汤类', '主食', '甜点']
  const ingredients = ['猪肉', '牛肉', '鸡肉', '鱼', '虾', '蛋', '豆腐', '土豆', '番茄', '青菜']

  useEffect(() => {
    loadSearchHistory()
    loadHotSearches()
  }, [userId])

  const loadSearchHistory = async () => {
    if (!userId) return
    
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', userId)
        .order('searched_at', { ascending: false })
        .limit(10)
      
      if (!error && data) {
        setSearchHistory(data)
      }
    } catch (error) {
      console.error('Failed to load search history:', error)
    }
  }

  const loadHotSearches = async () => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('name')
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (!error && data) {
        const hotKeywords = data.map(dish => dish.name)
        setHotSearches(hotKeywords)
      } else {
        setHotSearches(['红烧肉', '番茄炒蛋', '宫保鸡丁', '麻婆豆腐', '清蒸鱼', '糖醋排骨', '可乐鸡翅', '水煮鱼'])
      }
    } catch (error) {
      setHotSearches(['红烧肉', '番茄炒蛋', '宫保鸡丁', '麻婆豆腐', '清蒸鱼', '糖醋排骨', '可乐鸡翅', '水煮鱼'])
    }
  }

  const saveSearchHistory = async (keyword: string) => {
    if (!userId || !keyword.trim()) return
    
    try {
      await supabase
        .from('search_history')
        .insert({
          user_id: userId,
          keyword: keyword.trim(),
          searched_at: new Date().toISOString()
        })
      
      loadSearchHistory()
    } catch (error) {
      console.error('Failed to save search history:', error)
    }
  }

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    try {
      let queryBuilder = supabase
        .from('dishes')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      
      if (selectedCategory) {
        queryBuilder = queryBuilder.eq('category', selectedCategory)
      }
      
      const { data, error } = await queryBuilder.limit(20)
      
      if (!error && data) {
        setSearchResults(data)
        saveSearchHistory(query)
      } else {
        const mockResults: Dish[] = [
          {
            id: '1',
            name: '红烧肉',
            description: '经典家常菜，肥而不腻',
            category: 'meat',
            cuisine_type: '中式',
            ingredients: [],
            steps: [],
            nutrition_info: { calories: 450, protein: 15, carbohydrates: 8, fat: 38, fiber: 0 },
            cooking_time: 45,
            difficulty: 'medium',
            image_url: '',
            tags: ['猪肉', '家常菜'],
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            name: '番茄炒蛋',
            description: '简单易做的家常菜',
            category: 'egg',
            cuisine_type: '中式',
            ingredients: [],
            steps: [],
            nutrition_info: { calories: 180, protein: 8, carbohydrates: 6, fat: 12, fiber: 1 },
            cooking_time: 15,
            difficulty: 'easy',
            image_url: '',
            tags: ['蛋类', '番茄', '家常菜'],
            created_at: new Date().toISOString()
          }
        ]
        setSearchResults(mockResults)
      }
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [selectedCategory, userId])

  const clearSearchHistory = async () => {
    if (!userId) return
    
    try {
      await supabase
        .from('search_history')
        .delete()
        .eq('user_id', userId)
      
      setSearchHistory([])
    } catch (error) {
      console.error('Failed to clear search history:', error)
    }
  }

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchHistory,
    hotSearches,
    isSearching,
    selectedCategory,
    setSelectedCategory,
    selectedIngredient,
    setSelectedIngredient,
    categories,
    ingredients,
    search,
    clearSearchHistory
  }
}
