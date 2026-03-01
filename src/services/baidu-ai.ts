const BAIDU_AI_API_KEY = import.meta.env.VITE_BAIDU_AI_API_KEY
const BAIDU_AI_SECRET_KEY = import.meta.env.VITE_BAIDU_AI_SECRET_KEY

interface BaiduAIToken {
  access_token: string
  expires_in: number
}

let cachedToken: BaiduAIToken | null = null
let tokenExpiry = 0

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken.access_token
  }

  const response = await fetch(
    `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_AI_API_KEY}&client_secret=${BAIDU_AI_SECRET_KEY}`,
    { method: 'POST' }
  )

  const data = await response.json()
  cachedToken = data
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000

  return data.access_token
}

export async function recognizeDishImage(imageBase64: string): Promise<{
  results: Array<{
    name: string
    score: number
    calorie: number
  }>
}> {
  const token = await getAccessToken()
  
  const response = await fetch(
    `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `image=${encodeURIComponent(imageBase64)}&top_num=5`,
    }
  )

  return response.json()
}

export async function analyzeNutrition(ingredients: string[]): Promise<{
  calories: number
  protein: number
  carbohydrates: number
  fat: number
}> {
  const token = await getAccessToken()
  
  const response = await fetch(
    `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: `请分析以下食材的营养成分（每100克）：${ingredients.join('、')}。请返回JSON格式：{"calories": 数值, "protein": 数值, "carbohydrates": 数值, "fat": 数值}`,
          },
        ],
      }),
    }
  )

  const data = await response.json()
  return JSON.parse(data.result)
}

export async function generateDishRecommendation(params: {
  city: string
  equipment: string[]
  preferences: string[]
  mealType: 'breakfast' | 'lunch' | 'dinner'
}): Promise<{
  dishes: Array<{
    name: string
    reason: string
    nutrition_score: number
  }>
}> {
  const token = await getAccessToken()
  
  const prompt = `作为一位专业的营养师和厨师，请根据以下条件推荐3道菜：
- 城市：${params.city}
- 厨房设备：${params.equipment.join('、')}
- 口味偏好：${params.preferences.join('、')}
- 餐次：${params.mealType === 'breakfast' ? '早餐' : params.mealType === 'lunch' ? '午餐' : '晚餐'}

要求：
1. 确保营养均衡，包含肉类、蛋类和蔬菜类
2. 考虑当地饮食习惯和食材可获得性
3. 适合现有厨房设备制作

请返回JSON格式：{"dishes": [{"name": "菜名", "reason": "推荐理由", "nutrition_score": 营养评分1-10}]}`

  const response = await fetch(
    `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
      }),
    }
  )

  const data = await response.json()
  return JSON.parse(data.result)
}
