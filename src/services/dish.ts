import { supabase } from './supabase'
import type { Dish, SearchHistory } from '@/types'

export async function searchDishes(params: {
  keyword?: string
  category?: string
  ingredients?: string[]
  cuisineType?: string
  difficulty?: string
  limit?: number
  offset?: number
}): Promise<{ dishes: Dish[]; total: number }> {
  let query = supabase
    .from('dishes')
    .select('*', { count: 'exact' })

  if (params.keyword) {
    query = query.or(`name.ilike.%${params.keyword}%,description.ilike.%${params.keyword}%`)
  }

  if (params.category) {
    query = query.eq('category', params.category)
  }

  if (params.ingredients && params.ingredients.length > 0) {
    query = query.contains('ingredients', params.ingredients)
  }

  if (params.cuisineType) {
    query = query.eq('cuisine_type', params.cuisineType)
  }

  if (params.difficulty) {
    query = query.eq('difficulty', params.difficulty)
  }

  const limit = params.limit || 20
  const offset = params.offset || 0

  query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false })

  const { data, error, count } = await query

  if (error) throw error

  return {
    dishes: data as Dish[],
    total: count || 0,
  }
}

export async function getDishById(id: string): Promise<Dish | null> {
  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data as Dish
}

export async function saveSearchHistory(userId: string, keyword: string): Promise<void> {
  const { error } = await supabase.from('search_history').insert({
    user_id: userId,
    keyword,
    searched_at: new Date().toISOString(),
  })

  if (error) throw error
}

export async function getSearchHistory(userId: string, limit = 10): Promise<SearchHistory[]> {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .eq('user_id', userId)
    .order('searched_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return data as SearchHistory[]
}

export async function getHotSearches(limit = 10): Promise<Array<{ keyword: string; count: number }>> {
  const { data, error } = await supabase
    .from('search_history')
    .select('keyword')
    .gte('searched_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  if (error) throw error

  const keywordCount = data.reduce((acc, item) => {
    acc[item.keyword] = (acc[item.keyword] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(keywordCount)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export async function getRecommendedDishes(params: {
  city: string
  equipment: string[]
  limit?: number
}): Promise<Dish[]> {
  const limit = params.limit || 10

  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data as Dish[]
}
