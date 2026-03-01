export interface User {
  id: string
  phone?: string
  wechat_openid?: string
  alipay_userid?: string
  city: string
  kitchen_equipment: string[]
  preferences: UserPreferences
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  cuisine_types: string[]
  spice_level: 'mild' | 'medium' | 'hot'
  serving_size: number
  dietary_restrictions: string[]
}

export interface Dish {
  id: string
  name: string
  description: string
  category: DishCategory
  cuisine_type: string
  ingredients: Ingredient[]
  steps: CookingStep[]
  nutrition_info: NutritionInfo
  cooking_time: number
  difficulty: 'easy' | 'medium' | 'hard'
  image_url: string
  tags: string[]
  source_platform?: 'xiachufang' | 'xiaohongshu' | 'self'
  source_url?: string
  created_at: string
}

export type DishCategory = 'meat' | 'egg' | 'vegetable' | 'soup' | 'staple' | 'dessert'

export interface Ingredient {
  name: string
  amount: number
  unit: string
  category: 'meat' | 'egg' | 'vegetable' | 'seasoning' | 'other'
  estimated_price?: number
  storage_type?: 'room' | 'refrigerate' | 'freeze'
  storage_note?: string
}

export interface CookingStep {
  step_number: number
  description: string
  image_url?: string
  duration?: number
  tips?: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
}

export interface WeeklyPlan {
  id: string
  user_id: string
  week_start_date: string
  meals: DailyMeal[]
  created_at: string
  updated_at: string
}

export interface DailyMeal {
  date: string
  breakfast: string[]
  lunch: string[]
  dinner: string[]
}

export interface ShoppingList {
  id: string
  user_id: string
  week_plan_id: string
  items: ShoppingItem[]
  generated_at: string
  purchased: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  amount: number
  unit: string
  estimated_price: number
  storage_type: 'room' | 'refrigerate' | 'freeze'
  storage_note: string
  category: string
  purchased: boolean
  dish_names: string[]
}

export interface PurchaseRecord {
  id: string
  user_id: string
  shopping_list_id?: string
  total_amount: number
  items: PurchasedItem[]
  purchase_date: string
  store_name?: string
  notes?: string
}

export interface PurchasedItem {
  name: string
  actual_price: number
  amount: number
  unit: string
}

export interface SearchHistory {
  id: string
  user_id: string
  keyword: string
  searched_at: string
}

export interface KitchenEquipment {
  id: string
  name: string
  icon: string
  category: 'cooking' | 'preparation' | 'storage' | 'appliance'
}
