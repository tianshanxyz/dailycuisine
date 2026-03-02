import { cities, getSeasonalIngredients, getRecommendedCuisines } from '@/data/cities'
import { mealScenarios, familyMemberTypes } from '@/data/preferences'
import type { Dish } from '@/types'

interface UserPreferences {
  city: string
  familyMembers: { type: string; count: number }[]
  spiceLevel: string
  tastePreferences: string[]
  dietaryRestrictions: string[]
  preferredCuisines: string[]
  nutritionGoals: string[]
}

interface RecommendationContext {
  userPreferences: UserPreferences
  currentMonth: number
  mealType: 'breakfast' | 'lunch' | 'dinner'
  weather?: string
  occasion?: string
}

interface RecommendedMeal {
  dishes: Dish[]
  totalNutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  estimatedCost: number
  cookingTime: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export class RecommendationEngine {
  // 根据用户偏好计算菜品匹配分数
  calculateMatchScore(dish: Dish, context: RecommendationContext): number {
    let score = 0
    const { userPreferences } = context

    // 1. 菜系匹配 (权重: 25%)
    if (userPreferences.preferredCuisines.length > 0) {
      const cuisineMatch = userPreferences.preferredCuisines.some(c => 
        dish.cuisine_type?.toLowerCase().includes(c.toLowerCase()) ||
        dish.tags.some(tag => tag.toLowerCase().includes(c.toLowerCase()))
      )
      if (cuisineMatch) score += 25
    } else {
      score += 15 // 没有偏好时给予基础分
    }

    // 2. 辣度匹配 (权重: 20%)
    const spiceMap: Record<string, number> = {
      'none': 0, 'mild': 1, 'medium': 2, 'hot': 3, 'extreme': 4
    }
    const userSpice = spiceMap[userPreferences.spiceLevel] || 2
    const dishSpice = this.estimateDishSpiceLevel(dish)
    const spiceDiff = Math.abs(userSpice - dishSpice)
    score += Math.max(0, 20 - spiceDiff * 7)

    // 3. 口味倾向匹配 (权重: 15%)
    if (userPreferences.tastePreferences.length > 0) {
      const tasteMatch = userPreferences.tastePreferences.some(taste =>
        dish.tags.some(tag => this.matchTastePreference(tag, taste))
      )
      if (tasteMatch) score += 15
    }

    // 4. 时令食材匹配 (权重: 15%)
    const seasonalIngredients = getSeasonalIngredients(userPreferences.city, context.currentMonth)
    const seasonalMatch = dish.ingredients.some(ing =>
      seasonalIngredients.some(seasonal => 
        ing.name.includes(seasonal) || seasonal.includes(ing.name)
      )
    )
    if (seasonalMatch) score += 15

    // 5. 饮食禁忌过滤 (权重: -100% 如果不匹配)
    if (userPreferences.dietaryRestrictions.length > 0) {
      const hasRestriction = this.checkDietaryRestrictions(dish, userPreferences.dietaryRestrictions)
      if (hasRestriction) score -= 100
    }

    // 6. 营养均衡 (权重: 10%)
    const nutritionScore = this.calculateNutritionScore(dish, userPreferences.nutritionGoals)
    score += nutritionScore * 10

    return Math.max(0, score)
  }

  // 估算菜品辣度
  private estimateDishSpiceLevel(dish: Dish): number {
    const spicyKeywords = ['辣', '麻辣', '香辣', ' spicy', 'hot', 'pepper', 'chili']
    const mildKeywords = ['微辣', 'mild', 'slight']
    
    const nameAndTags = `${dish.name} ${dish.tags.join(' ')}`.toLowerCase()
    
    if (spicyKeywords.some(k => nameAndTags.includes(k))) {
      if (mildKeywords.some(k => nameAndTags.includes(k))) return 1
      if (nameAndTags.includes('特辣') || nameAndTags.includes('变态辣')) return 4
      if (nameAndTags.includes('中辣')) return 2
      return 3
    }
    
    return 0
  }

  // 匹配口味偏好
  private matchTastePreference(tag: string, preference: string): boolean {
    const tasteMap: Record<string, string[]> = {
      'sour': ['酸', '醋', '柠檬', '糖醋', 'sour', 'vinegar'],
      'salty': ['咸', '盐', 'salty', 'salt'],
      'spicy': ['辣', '麻辣', '香辣', 'spicy', 'hot'],
      'sweet': ['甜', '糖', '蜜', 'sweet', 'sugar', 'honey'],
      'savory': ['酱', '红烧', '酱爆', 'savory', 'braised'],
      'light': ['清', '蒸', '白灼', 'light', 'steam', 'boiled'],
      'rich': ['浓', '奶油', '芝士', 'rich', 'cream', 'cheese'],
      'fresh': ['鲜', '凉', '拌', 'fresh', 'cold', 'salad']
    }
    
    const keywords = tasteMap[preference] || []
    return keywords.some(k => tag.toLowerCase().includes(k.toLowerCase()))
  }

  // 检查饮食禁忌
  private checkDietaryRestrictions(dish: Dish, restrictions: string[]): boolean {
    const restrictionMap: Record<string, string[]> = {
      'vegetarian': ['肉', '鸡', '鸭', '鱼', '虾', '蟹', 'meat', 'chicken', 'fish', 'pork', 'beef'],
      'vegan': ['肉', '蛋', '奶', '鸡', '鸭', '鱼', '虾', 'meat', 'egg', 'milk', 'cheese'],
      'halal': ['猪', '猪肉', 'pork', 'lard'],
      'kosher': ['猪', '猪肉', 'pork', '虾', '蟹', 'shellfish'],
      'no-seafood': ['鱼', '虾', '蟹', '贝', '海鲜', 'fish', 'shrimp', 'crab', 'seafood'],
      'no-beef': ['牛', '牛肉', 'beef', 'steak'],
      'no-pork': ['猪', '猪肉', 'pork', 'bacon', 'ham'],
      'no-mutton': ['羊', '羊肉', 'mutton', 'lamb']
    }

    return restrictions.some(restriction => {
      const forbiddenIngredients = restrictionMap[restriction] || []
      return dish.ingredients.some(ing =>
        forbiddenIngredients.some(forbidden => 
          ing.name.toLowerCase().includes(forbidden.toLowerCase())
        )
      )
    })
  }

  // 计算营养分数
  private calculateNutritionScore(dish: Dish, goals: string[]): number {
    if (goals.length === 0) return 0.5
    
    let score = 0
    const nutrition = dish.nutrition_info
    
    goals.forEach(goal => {
      switch (goal) {
        case 'high-protein':
          if (nutrition.protein > 20) score += 1
          break
        case 'low-carb':
          if (nutrition.carbohydrates < 15) score += 1
          break
        case 'high-fiber':
          if (nutrition.fiber > 3) score += 1
          break
        case 'balanced':
          const total = nutrition.protein + nutrition.carbohydrates + nutrition.fat
          const proteinRatio = nutrition.protein / total
          if (proteinRatio >= 0.2 && proteinRatio <= 0.3) score += 1
          break
      }
    })
    
    return score / goals.length
  }

  // 生成场景化推荐
  generateScenarioRecommendation(
    scenarioId: string,
    userPreferences: UserPreferences
  ): RecommendedMeal {
    const scenario = mealScenarios.find(s => s.id === scenarioId)
    if (!scenario) throw new Error('Scenario not found')

    // 根据场景配置生成推荐
    const config = scenario.defaultConfig
    const dishes: Dish[] = []
    
    // 这里应该根据配置从数据库获取具体菜品
    // 现在返回模拟数据
    
    return {
      dishes,
      totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      estimatedCost: 0,
      cookingTime: 0,
      difficulty: 'medium'
    }
  }

  // 生成一周菜谱
  generateWeeklyMenu(
    userPreferences: UserPreferences,
    availableDishes: Dish[]
  ): Record<string, RecommendedMeal[]> {
    const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const meals: Record<string, RecommendedMeal[]> = {}
    
    const context: RecommendationContext = {
      userPreferences,
      currentMonth: new Date().getMonth() + 1,
      mealType: 'dinner'
    }

    weekDays.forEach(day => {
      meals[day] = [
        this.generateMealRecommendation(availableDishes, { ...context, mealType: 'breakfast' }),
        this.generateMealRecommendation(availableDishes, { ...context, mealType: 'lunch' }),
        this.generateMealRecommendation(availableDishes, { ...context, mealType: 'dinner' })
      ]
    })

    return meals
  }

  // 生成单餐推荐
  private generateMealRecommendation(
    availableDishes: Dish[],
    context: RecommendationContext
  ): RecommendedMeal {
    // 计算所有菜品的匹配分数
    const scoredDishes = availableDishes.map(dish => ({
      dish,
      score: this.calculateMatchScore(dish, context)
    }))

    // 按分数排序
    scoredDishes.sort((a, b) => b.score - a.score)

    // 选择前N个菜品组成一餐
    const selectedDishes = scoredDishes.slice(0, 4).map(s => s.dish)

    // 计算总营养
    const totalNutrition = selectedDishes.reduce((acc, dish) => ({
      calories: acc.calories + dish.nutrition_info.calories,
      protein: acc.protein + dish.nutrition_info.protein,
      carbs: acc.carbs + dish.nutrition_info.carbohydrates,
      fat: acc.fat + dish.nutrition_info.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

    return {
      dishes: selectedDishes,
      totalNutrition,
      estimatedCost: selectedDishes.reduce((sum, d) => 
        sum + d.ingredients.reduce((s, i) => s + (i.estimated_price || 0), 0), 0
      ),
      cookingTime: Math.max(...selectedDishes.map(d => d.cooking_time)),
      difficulty: this.calculateOverallDifficulty(selectedDishes)
    }
  }

  private calculateOverallDifficulty(dishes: Dish[]): 'easy' | 'medium' | 'hard' {
    const difficultyScores = { easy: 1, medium: 2, hard: 3 }
    const avgScore = dishes.reduce((sum, d) => 
      sum + difficultyScores[d.difficulty], 0
    ) / dishes.length

    if (avgScore <= 1.5) return 'easy'
    if (avgScore <= 2.5) return 'medium'
    return 'hard'
  }

  // 获取今日推荐
  getTodayRecommendations(
    userPreferences: UserPreferences,
    availableDishes: Dish[],
    limit: number = 4
  ): Dish[] {
    const context: RecommendationContext = {
      userPreferences,
      currentMonth: new Date().getMonth() + 1,
      mealType: 'dinner'
    }

    const scoredDishes = availableDishes.map(dish => ({
      dish,
      score: this.calculateMatchScore(dish, context)
    }))

    scoredDishes.sort((a, b) => b.score - a.score)
    
    return scoredDishes.slice(0, limit).map(s => s.dish)
  }

  // 根据季节推荐
  getSeasonalRecommendations(cityCode: string, month?: number): string[] {
    return getSeasonalIngredients(cityCode, month)
  }

  // 获取地方特色推荐
  getLocalSpecialties(cityCode: string): string[] {
    return getRecommendedCuisines(cityCode)
  }
}

export const recommendationEngine = new RecommendationEngine()
