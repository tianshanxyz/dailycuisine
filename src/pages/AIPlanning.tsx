import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ChevronLeft, RefreshCw, Calendar, Clock, Users, ChefHat, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { recommendationEngine } from '@/services/recommendationEngine'
import { mealScenarios } from '@/data/preferences'
import { useAppStore } from '@/stores/appStore'

interface WeeklyPlan {
  day: string
  meals: {
    type: 'breakfast' | 'lunch' | 'dinner'
    dishes: string[]
    estimatedTime: number
  }[]
}

export default function AIPlanning() {
  const navigate = useNavigate()
  const { selectedCity } = useAppStore()
  
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState('')
  const [generatedPlan, setGeneratedPlan] = useState<WeeklyPlan[] | null>(null)
  const [preferences, setPreferences] = useState({
    includeBreakfast: true,
    includeLunch: true,
    includeDinner: true,
    maxCookingTime: 60,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    budgetLevel: 'normal' as 'low' | 'normal' | 'high'
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // 模拟 AI 生成过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 生成模拟的一周菜谱
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const mockPlan: WeeklyPlan[] = days.map(day => ({
      day,
      meals: [
        ...(preferences.includeBreakfast ? [{
          type: 'breakfast' as const,
          dishes: ['小米粥', '煎蛋', '咸菜'],
          estimatedTime: 15
        }] : []),
        ...(preferences.includeLunch ? [{
          type: 'lunch' as const,
          dishes: ['红烧肉', '清炒时蔬', '番茄蛋汤', '米饭'],
          estimatedTime: 45
        }] : []),
        ...(preferences.includeDinner ? [{
          type: 'dinner' as const,
          dishes: ['清蒸鲈鱼', '麻婆豆腐', '紫菜蛋花汤', '米饭'],
          estimatedTime: 40
        }] : [])
      ]
    }))
    
    setGeneratedPlan(mockPlan)
    setIsGenerating(false)
    setStep(3)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">AI 智能菜谱规划</h2>
              <p className="text-muted-foreground">
                基于您的口味偏好、营养需求和时令食材，为您生成个性化的一周菜谱
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">选择用餐场景</h3>
              <div className="grid grid-cols-2 gap-3">
                {mealScenarios.map((scenario) => (
                  <Card
                    key={scenario.id}
                    className={`cursor-pointer transition-all ${
                      selectedScenario === scenario.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-2xl mb-2">{scenario.icon}</div>
                      <h4 className="font-medium text-sm">{scenario.name}</h4>
                      <p className="text-xs text-muted-foreground">{scenario.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedCity && (
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-medium">当前城市：</span>
                  将根据当地时令食材和特色菜系进行推荐
                </p>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">规划偏好设置</h2>
              <p className="text-muted-foreground">自定义您的菜谱规划选项</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">包含餐次</h3>
                <div className="space-y-2">
                  {[
                    { key: 'includeBreakfast', label: '早餐', icon: '🌅' },
                    { key: 'includeLunch', label: '午餐', icon: '☀️' },
                    { key: 'includeDinner', label: '晚餐', icon: '🌙' }
                  ].map((meal) => (
                    <div key={meal.key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{meal.icon}</span>
                        <span className="font-medium">{meal.label}</span>
                      </div>
                      <Button
                        variant={preferences[meal.key as keyof typeof preferences] ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreferences({
                          ...preferences,
                          [meal.key]: !preferences[meal.key as keyof typeof preferences]
                        })}
                      >
                        {preferences[meal.key as keyof typeof preferences] ? '已包含' : '不包含'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">烹饪时间限制</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 30, label: '30分钟内' },
                    { value: 60, label: '1小时内' },
                    { value: 0, label: '不限时' }
                  ].map((time) => (
                    <Button
                      key={time.value}
                      variant={preferences.maxCookingTime === time.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences({ ...preferences, maxCookingTime: time.value })}
                    >
                      {time.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">难度偏好</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'easy', label: '简单' },
                    { value: 'medium', label: '中等' },
                    { value: 'hard', label: '困难' }
                  ].map((diff) => (
                    <Button
                      key={diff.value}
                      variant={preferences.difficulty === diff.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences({ ...preferences, difficulty: diff.value as typeof preferences.difficulty })}
                    >
                      {diff.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">预算水平</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'low', label: '经济' },
                    { value: 'normal', label: '标准' },
                    { value: 'high', label: '丰富' }
                  ].map((budget) => (
                    <Button
                      key={budget.value}
                      variant={preferences.budgetLevel === budget.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences({ ...preferences, budgetLevel: budget.value as typeof preferences.budgetLevel })}
                    >
                      {budget.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        if (isGenerating) {
          return (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-bold mb-2">AI 正在生成菜谱...</h2>
              <p className="text-muted-foreground">
                正在分析您的偏好、时令食材和营养需求
              </p>
            </div>
          )
        }

        if (generatedPlan) {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">菜谱生成完成！</h2>
                <p className="text-muted-foreground">为您定制的一周菜谱已准备就绪</p>
              </div>

              <div className="space-y-4">
                {generatedPlan.map((dayPlan) => (
                  <Card key={dayPlan.day}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>{dayPlan.day}</span>
                        <span className="text-xs text-muted-foreground font-normal">
                          {dayPlan.meals.reduce((sum, m) => sum + m.estimatedTime, 0)}分钟
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {dayPlan.meals.map((meal) => (
                        <div key={meal.type} className="flex items-start gap-3">
                          <div className="w-12 text-xs text-muted-foreground capitalize">
                            {meal.type === 'breakfast' ? '早餐' : meal.type === 'lunch' ? '午餐' : '晚餐'}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-1">
                              {meal.dishes.map((dish, idx) => (
                                <span key={idx} className="text-sm">
                                  {dish}{idx < meal.dishes.length - 1 ? '、' : ''}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {meal.estimatedTime}分钟
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(2)}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  重新生成
                </Button>
                <Button className="flex-1">
                  <Check className="h-4 w-4 mr-1" />
                  确认使用
                </Button>
              </div>
            </div>
          )
        }

        return null

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === step ? 'bg-primary' : i < step ? 'bg-primary/50' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {step}/3
          </span>
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Footer */}
        {step < 3 && (
          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(step - 1)}
              >
                上一步
              </Button>
            )}
            <Button
              className="flex-1"
              onClick={() => {
                if (step === 2) {
                  handleGenerate()
                } else {
                  setStep(step + 1)
                }
              }}
              disabled={step === 1 && !selectedScenario}
            >
              {step === 2 ? (
                <>
                  <Sparkles className="h-4 w-4 mr-1" />
                  生成菜谱
                </>
              ) : (
                '下一步'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
