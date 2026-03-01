import { supabase } from './supabase'
import type { Dish } from '@/types'

export class DishDataService {
  private cache: Map<string, Dish[]> = new Map()
  private lastFetchTime: Map<string, number> = new Map()

  async searchDishes(query: string, platform?: 'xiachufang' | 'xiaohongshu'): Promise<Dish[]> {
    const cacheKey = `${platform || 'all'}-${query}`
    
    if (this.cache.has(cacheKey)) {
      const lastFetch = this.lastFetchTime.get(cacheKey) || 0
      const now = Date.now()
      
      if (now - lastFetch < 5 * 60 * 1000) {
        return this.cache.get(cacheKey) || []
      }
    }

    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .limit(20)
      
      if (!error && data && data.length > 0) {
        this.cache.set(cacheKey, data)
        this.lastFetchTime.set(cacheKey, Date.now())
        return data
      }
      
      return this.getMockDishes(query)
    } catch (error) {
      console.error('Search dishes error:', error)
      return this.getMockDishes(query)
    }
  }

  private getMockDishes(query: string): Dish[] {
    const mockDishes: Dish[] = [
      {
        id: '1',
        name: '红烧肉',
        description: '经典家常菜，肥而不腻，入口即化',
        category: 'meat',
        cuisine_type: '中式',
        ingredients: [
          { name: '五花肉', amount: 500, unit: '克', category: 'meat', estimated_price: 25, storage_type: 'refrigerate' },
          { name: '生抽', amount: 2, unit: '勺', category: 'seasoning', estimated_price: 2 },
          { name: '老抽', amount: 1, unit: '勺', category: 'seasoning', estimated_price: 1 },
          { name: '料酒', amount: 2, unit: '勺', category: 'seasoning', estimated_price: 2 },
          { name: '冰糖', amount: 30, unit: '克', category: 'other', estimated_price: 3 },
        ],
        steps: [
          { step_number: 1, description: '五花肉切块，冷水下锅焯水，撇去浮沫后捞出备用', duration: 10 },
          { step_number: 2, description: '锅中放少许油，加入冰糖小火炒至焦糖色', duration: 5 },
          { step_number: 3, description: '放入五花肉翻炒上色，加入葱姜、八角、桂皮爆香', duration: 5 },
          { step_number: 4, description: '加入料酒、生抽、老抽，倒入没过肉的热水', duration: 3 },
          { step_number: 5, description: '大火烧开后转小火炖煮40分钟至软烂', duration: 40 },
          { step_number: 6, description: '最后大火收汁，汤汁浓稠即可出锅', duration: 5 },
        ],
        nutrition_info: { calories: 450, protein: 15, carbohydrates: 8, fat: 38, fiber: 0 },
        cooking_time: 45,
        difficulty: 'medium',
        image_url: '',
        tags: ['猪肉', '家常菜', '下饭菜'],
        source_platform: 'self',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: '番茄炒蛋',
        description: '简单易做的家常菜，营养丰富',
        category: 'egg',
        cuisine_type: '中式',
        ingredients: [
          { name: '番茄', amount: 3, unit: '个', category: 'vegetable', estimated_price: 6, storage_type: 'room' },
          { name: '鸡蛋', amount: 4, unit: '个', category: 'egg', estimated_price: 5, storage_type: 'refrigerate' },
          { name: '葱花', amount: 10, unit: '克', category: 'vegetable', estimated_price: 1 },
          { name: '盐', amount: 1, unit: '勺', category: 'seasoning', estimated_price: 0.5 },
        ],
        steps: [
          { step_number: 1, description: '番茄切块，鸡蛋打散加少许盐', duration: 3 },
          { step_number: 2, description: '热锅凉油，倒入蛋液炒至凝固盛出', duration: 3 },
          { step_number: 3, description: '锅中留底油，放入番茄块翻炒出汁', duration: 5 },
          { step_number: 4, description: '加入炒好的鸡蛋，翻炒均匀', duration: 2 },
          { step_number: 5, description: '加盐调味，撒上葱花即可出锅', duration: 2 },
        ],
        nutrition_info: { calories: 180, protein: 8, carbohydrates: 6, fat: 12, fiber: 1 },
        cooking_time: 15,
        difficulty: 'easy',
        image_url: '',
        tags: ['蛋类', '番茄', '家常菜', '快手菜'],
        source_platform: 'self',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: '清蒸鲈鱼',
        description: '鲜嫩可口，营养丰富的蒸菜',
        category: 'meat',
        cuisine_type: '粤菜',
        ingredients: [
          { name: '鲈鱼', amount: 1, unit: '条', category: 'meat', estimated_price: 35, storage_type: 'refrigerate' },
          { name: '葱丝', amount: 20, unit: '克', category: 'vegetable', estimated_price: 1 },
          { name: '姜丝', amount: 10, unit: '克', category: 'vegetable', estimated_price: 0.5 },
          { name: '蒸鱼豉油', amount: 2, unit: '勺', category: 'seasoning', estimated_price: 2 },
        ],
        steps: [
          { step_number: 1, description: '鲈鱼处理干净，在鱼身两侧划几刀', duration: 5 },
          { step_number: 2, description: '鱼身铺上姜丝，放入蒸锅', duration: 2 },
          { step_number: 3, description: '大火蒸8-10分钟至鱼眼突出', duration: 10 },
          { step_number: 4, description: '取出鱼，倒掉蒸出的水，铺上葱丝', duration: 2 },
          { step_number: 5, description: '淋上蒸鱼豉油，浇上热油即可', duration: 2 },
        ],
        nutrition_info: { calories: 120, protein: 22, carbohydrates: 2, fat: 3, fiber: 0 },
        cooking_time: 30,
        difficulty: 'medium',
        image_url: '',
        tags: ['鱼类', '蒸菜', '粤菜', '健康'],
        source_platform: 'self',
        created_at: new Date().toISOString()
      }
    ]
    
    this.cache.set(`all-${query}`, mockDishes)
    this.lastFetchTime.set(`all-${query}`, Date.now())
    
    return mockDishes.filter(dish => 
      dish.name.includes(query) || 
      dish.description.includes(query) ||
      dish.tags.some(tag => tag.includes(query))
    )
  }

  async getDishById(id: string): Promise<Dish | null> {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (!error && data) {
        return data
      }
      
      const mockDishes = this.getMockDishes('')
      return mockDishes.find(dish => dish.id === id) || null
    } catch (error) {
      console.error('Get dish error:', error)
      const mockDishes = this.getMockDishes('')
      return mockDishes.find(dish => dish.id === id) || null
    }
  }

  async saveDish(dish: Dish): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('dishes')
        .upsert(dish)
      
      return !error
    } catch (error) {
      console.error('Save dish error:', error)
      return false
    }
  }

  clearCache() {
    this.cache.clear()
    this.lastFetchTime.clear()
  }
}

export const dishDataService = new DishDataService()
