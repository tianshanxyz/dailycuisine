import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockDish = {
  id: '1',
  name: '红烧肉',
  description: '经典家常菜，肥而不腻，入口即化',
  cooking_time: 45,
  difficulty: '中等',
  servings: 4,
  image_url: '/placeholder-dish.jpg',
  ingredients: [
    { name: '五花肉', amount: 500, unit: '克', estimated_price: 25 },
    { name: '生抽', amount: 2, unit: '勺', estimated_price: 2 },
    { name: '老抽', amount: 1, unit: '勺', estimated_price: 1 },
    { name: '料酒', amount: 2, unit: '勺', estimated_price: 2 },
    { name: '冰糖', amount: 30, unit: '克', estimated_price: 3 },
    { name: '八角', amount: 2, unit: '个', estimated_price: 1 },
    { name: '桂皮', amount: 1, unit: '小块', estimated_price: 1 },
    { name: '葱姜', amount: '适量', unit: '', estimated_price: 2 },
  ],
  steps: [
    {
      step_number: 1,
      description: '五花肉切块，冷水下锅焯水，撇去浮沫后捞出备用',
      duration: 10,
    },
    {
      step_number: 2,
      description: '锅中放少许油，加入冰糖小火炒至焦糖色',
      duration: 5,
    },
    {
      step_number: 3,
      description: '放入五花肉翻炒上色，加入葱姜、八角、桂皮爆香',
      duration: 5,
    },
    {
      step_number: 4,
      description: '加入料酒、生抽、老抽，倒入没过肉的热水',
      duration: 3,
    },
    {
      step_number: 5,
      description: '大火烧开后转小火炖煮40分钟至软烂',
      duration: 40,
    },
    {
      step_number: 6,
      description: '最后大火收汁，汤汁浓稠即可出锅',
      duration: 5,
    },
  ],
  nutrition_info: {
    calories: 450,
    protein: 15,
    carbohydrates: 8,
    fat: 38,
    fiber: 0,
  },
}

export default function DishDetail() {
  const { id: _id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <span className="text-6xl">🍖</span>
        </div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{mockDish.name}</h1>
          <p className="text-muted-foreground">{mockDish.description}</p>
          
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{mockDish.cooking_time}分钟</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{mockDish.servings}人份</span>
            </div>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
              {mockDish.difficulty}
            </span>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">食材清单</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockDish.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span>{ingredient.name}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{ingredient.amount}{ingredient.unit}</span>
                    {ingredient.estimated_price && (
                      <span className="text-primary">
                        ¥{ingredient.estimated_price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between font-medium">
                <span>预估总价</span>
                <span className="text-primary text-lg">
                  ¥{mockDish.ingredients.reduce((sum, i) => sum + (i.estimated_price || 0), 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">制作步骤</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDish.steps.map((step) => (
                <div key={step.step_number} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {step.step_number}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{step.description}</p>
                    {step.duration && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ⏱ {step.duration}分钟
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">营养成分（每份）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-bold">{mockDish.nutrition_info.calories}</p>
                <p className="text-xs text-muted-foreground">卡路里</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-bold">{mockDish.nutrition_info.protein}g</p>
                <p className="text-xs text-muted-foreground">蛋白质</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-bold">{mockDish.nutrition_info.carbohydrates}g</p>
                <p className="text-xs text-muted-foreground">碳水化合物</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-bold">{mockDish.nutrition_info.fat}g</p>
                <p className="text-xs text-muted-foreground">脂肪</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="max-w-lg mx-auto">
            <Button className="w-full" size="lg">
              添加到本周菜谱
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
