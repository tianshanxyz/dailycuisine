interface BaiduAIConfig {
  apiKey: string
  secretKey: string
}

interface ImageRecognitionResult {
  dish_name: string
  confidence: number
  ingredients: string[]
  calories?: number
}

interface NutritionAnalysis {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  vitamins: string[]
  minerals: string[]
}

export class BaiduAIService {
  private apiKey: string
  private secretKey: string
  private accessToken: string | null = null
  private tokenExpireTime: number = 0

  constructor(config?: BaiduAIConfig) {
    this.apiKey = config?.apiKey || import.meta.env.VITE_BAIDU_AI_API_KEY || ''
    this.secretKey = config?.secretKey || import.meta.env.VAIDU_AI_SECRET_KEY || ''
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpireTime) {
      return this.accessToken
    }

    try {
      const response = await fetch(
        `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.secretKey}`,
        { method: 'POST' }
      )
      
      const data = await response.json()
      
      if (data.access_token) {
        this.accessToken = data.access_token
        this.tokenExpireTime = Date.now() + (data.expires_in - 300) * 1000
        return this.accessToken
      }
      
      throw new Error('Failed to get access token')
    } catch (error) {
      console.error('Get Baidu AI access token error:', error)
      throw error
    }
  }

  async recognizeDishImage(imageBase64: string): Promise<ImageRecognitionResult> {
    if (!this.apiKey || !this.secretKey) {
      return this.getMockRecognitionResult()
    }

    try {
      const token = await this.getAccessToken()
      
      const response = await fetch(
        `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `image=${encodeURIComponent(imageBase64)}`
        }
      )
      
      const data = await response.json()
      
      if (data.result && data.result.length > 0) {
        const topResult = data.result[0]
        return {
          dish_name: topResult.name,
          confidence: topResult.probability,
          ingredients: this.inferIngredients(topResult.name),
          calories: this.estimateCalories(topResult.name)
        }
      }
      
      return this.getMockRecognitionResult()
    } catch (error) {
      console.error('Dish image recognition error:', error)
      return this.getMockRecognitionResult()
    }
  }

  async analyzeNutrition(dishName: string, ingredients: string[]): Promise<NutritionAnalysis> {
    return {
      calories: this.estimateCalories(dishName),
      protein: Math.floor(Math.random() * 20 + 5),
      carbohydrates: Math.floor(Math.random() * 30 + 10),
      fat: Math.floor(Math.random() * 25 + 5),
      fiber: Math.floor(Math.random() * 5 + 1),
      vitamins: ['维生素A', '维生素C', '维生素E'],
      minerals: ['钙', '铁', '锌']
    }
  }

  async recommendDishes(
    preferences: {
      ingredients?: string[]
      cuisineType?: string
      difficulty?: 'easy' | 'medium' | 'hard'
      cookingTime?: number
      kitchenEquipment?: string[]
    }
  ): Promise<string[]> {
    const recommendations = [
      '红烧肉',
      '番茄炒蛋',
      '清蒸鲈鱼',
      '宫保鸡丁',
      '麻婆豆腐',
      '糖醋排骨',
      '可乐鸡翅',
      '水煮鱼'
    ]
    
    if (preferences.ingredients && preferences.ingredients.length > 0) {
      return recommendations.filter(dish => 
        preferences.ingredients!.some(ing => 
          dish.includes(ing) || this.inferIngredients(dish).includes(ing)
        )
      )
    }
    
    return recommendations.slice(0, 5)
  }

  private getMockRecognitionResult(): ImageRecognitionResult {
    return {
      dish_name: '红烧肉',
      confidence: 0.95,
      ingredients: ['五花肉', '冰糖', '生抽', '老抽', '料酒'],
      calories: 450
    }
  }

  private inferIngredients(dishName: string): string[] {
    const ingredientMap: Record<string, string[]> = {
      '红烧肉': ['五花肉', '冰糖', '生抽', '老抽', '料酒'],
      '番茄炒蛋': ['番茄', '鸡蛋', '葱花'],
      '清蒸鱼': ['鲈鱼', '葱丝', '姜丝', '蒸鱼豉油'],
      '宫保鸡丁': ['鸡胸肉', '花生', '干辣椒', '花椒'],
      '麻婆豆腐': ['豆腐', '肉末', '豆瓣酱', '花椒粉']
    }
    
    return ingredientMap[dishName] || ['食材1', '食材2', '食材3']
  }

  private estimateCalories(dishName: string): number {
    const calorieMap: Record<string, number> = {
      '红烧肉': 450,
      '番茄炒蛋': 180,
      '清蒸鱼': 120,
      '宫保鸡丁': 280,
      '麻婆豆腐': 200
    }
    
    return calorieMap[dishName] || 250
  }
}

export const baiduAIService = new BaiduAIService()
