import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Users, Flame, Heart, ChefHat, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cities, popularCities } from '@/data/cities'
import { 
  spiceLevels, 
  tastePreferences, 
  dietaryRestrictions, 
  servingOptions,
  familyMemberTypes,
  cuisineOptions,
  nutritionGoals,
  mealScenarios
} from '@/data/preferences'
import { useAppStore } from '@/stores/appStore'

interface FamilyMember {
  type: string
  count: number
}

export default function UserPreferences() {
  const navigate = useNavigate()
  const { selectedCity, setSelectedCity } = useAppStore()
  
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState({
    city: selectedCity || '',
    servingSize: 4,
    familyMembers: [] as FamilyMember[],
    spiceLevel: 'medium',
    tastePreferences: [] as string[],
    dietaryRestrictions: [] as string[],
    preferredCuisines: [] as string[],
    nutritionGoals: [] as string[],
    selectedScenario: ''
  })

  const totalSteps = 5

  const handleCitySelect = (cityCode: string) => {
    setPreferences({ ...preferences, city: cityCode })
    setSelectedCity(cityCode)
  }

  const handleFamilyMemberChange = (type: string, count: number) => {
    const existing = preferences.familyMembers.find(m => m.type === type)
    if (existing) {
      if (count === 0) {
        setPreferences({
          ...preferences,
          familyMembers: preferences.familyMembers.filter(m => m.type !== type)
        })
      } else {
        setPreferences({
          ...preferences,
          familyMembers: preferences.familyMembers.map(m => 
            m.type === type ? { ...m, count } : m
          )
        })
      }
    } else if (count > 0) {
      setPreferences({
        ...preferences,
        familyMembers: [...preferences.familyMembers, { type, count }]
      })
    }
  }

  const getTotalPeople = () => {
    return preferences.familyMembers.reduce((sum, member) => {
      const type = familyMemberTypes.find(t => t.value === member.type)
      return sum + member.count
    }, 0)
  }

  const toggleArrayPreference = (key: keyof typeof preferences, value: string) => {
    const current = preferences[key] as string[]
    if (current.includes(value)) {
      setPreferences({
        ...preferences,
        [key]: current.filter(v => v !== value)
      })
    } else {
      setPreferences({
        ...preferences,
        [key]: [...current, value]
      })
    }
  }

  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = mealScenarios.find(s => s.id === scenarioId)
    if (scenario) {
      setPreferences({
        ...preferences,
        selectedScenario: scenarioId,
        familyMembers: Object.entries(scenario.members).map(([type, count]) => ({
          type,
          count: count as number
        }))
      })
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">选择您的城市</h2>
              <p className="text-muted-foreground">我们将根据您的位置推荐当地特色菜和时令食材</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">热门城市</h3>
                <div className="grid grid-cols-5 gap-2">
                  {popularCities.map((city) => (
                    <Button
                      key={city.code}
                      variant={preferences.city === city.code ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCitySelect(city.code)}
                      className="h-auto py-2"
                    >
                      {city.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">更多城市</h3>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-3">
                  <div className="grid grid-cols-4 gap-2">
                    {cities.map((city) => (
                      <Button
                        key={city.code}
                        variant={preferences.city === city.code ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCitySelect(city.code)}
                        className="text-xs h-auto py-1"
                      >
                        {city.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {preferences.city && (
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="font-medium">已选择：{cities.find(c => c.code === preferences.city)?.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    推荐菜系：{cities.find(c => c.code === preferences.city)?.cuisine.join('、')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">家庭用餐配置</h2>
              <p className="text-muted-foreground">选择适合您家庭的用餐方案</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">快速选择场景</h3>
              <div className="grid grid-cols-2 gap-3">
                {mealScenarios.map((scenario) => (
                  <Card
                    key={scenario.id}
                    className={`cursor-pointer transition-all ${
                      preferences.selectedScenario === scenario.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleScenarioSelect(scenario.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-2xl mb-2">{scenario.icon}</div>
                      <h4 className="font-medium">{scenario.name}</h4>
                      <p className="text-xs text-muted-foreground">{scenario.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">自定义家庭成员</h3>
                <div className="space-y-3">
                  {familyMemberTypes.map((type) => {
                    const currentCount = preferences.familyMembers.find(
                      m => m.type === type.value
                    )?.count || 0
                    
                    return (
                      <div key={type.value} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <p className="font-medium">{type.label}</p>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleFamilyMemberChange(type.value, Math.max(0, currentCount - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-medium">{currentCount}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleFamilyMemberChange(type.value, currentCount + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {getTotalPeople() > 0 && (
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="font-medium">总计：{getTotalPeople()} 人</p>
                  <p className="text-sm text-muted-foreground">
                    {preferences.familyMembers.map(m => {
                      const type = familyMemberTypes.find(t => t.value === m.type)
                      return `${type?.label} ${m.count}人`
                    }).join('，')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Flame className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">口味偏好</h2>
              <p className="text-muted-foreground">告诉我们您喜欢的口味</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">辣度选择</h3>
                <div className="grid grid-cols-1 gap-2">
                  {spiceLevels.map((level) => (
                    <Button
                      key={level.value}
                      variant={preferences.spiceLevel === level.value ? 'default' : 'outline'}
                      className="justify-start h-auto py-3"
                      onClick={() => setPreferences({ ...preferences, spiceLevel: level.value })}
                    >
                      <span className="text-xl mr-3">{level.icon}</span>
                      <div className="text-left">
                        <p className="font-medium">{level.label}</p>
                        <p className="text-xs text-muted-foreground">{level.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">口味倾向（可多选）</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tastePreferences.map((taste) => (
                    <Button
                      key={taste.value}
                      variant={preferences.tastePreferences.includes(taste.value) ? 'default' : 'outline'}
                      className="justify-start h-auto py-2"
                      onClick={() => toggleArrayPreference('tastePreferences', taste.value)}
                    >
                      <span className="text-lg mr-2">{taste.icon}</span>
                      <div className="text-left">
                        <p className="text-sm font-medium">{taste.label}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">饮食禁忌</h2>
              <p className="text-muted-foreground">选择您的饮食限制，我们将为您过滤不合适的菜品</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {dietaryRestrictions.map((restriction) => (
                  <Button
                    key={restriction.value}
                    variant={preferences.dietaryRestrictions.includes(restriction.value) ? 'default' : 'outline'}
                    className="justify-start h-auto py-3"
                    onClick={() => toggleArrayPreference('dietaryRestrictions', restriction.value)}
                  >
                    <span className="text-lg mr-2">{restriction.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium">{restriction.label}</p>
                      <p className="text-xs text-muted-foreground">{restriction.description}</p>
                    </div>
                  </Button>
                ))}
              </div>

              {preferences.dietaryRestrictions.length > 0 && (
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="font-medium mb-2">已选择的饮食限制：</p>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietaryRestrictions.map((value) => {
                      const restriction = dietaryRestrictions.find(r => r.value === value)
                      return (
                        <span key={value} className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                          {restriction?.icon} {restriction?.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ChefHat className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">菜系偏好</h2>
              <p className="text-muted-foreground">选择您喜欢的菜系类型</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {cuisineOptions.map((cuisine) => (
                  <Button
                    key={cuisine.value}
                    variant={preferences.preferredCuisines.includes(cuisine.value) ? 'default' : 'outline'}
                    className="justify-start h-auto py-3"
                    onClick={() => toggleArrayPreference('preferredCuisines', cuisine.value)}
                  >
                    <span className="text-lg mr-2">{cuisine.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium">{cuisine.label}</p>
                      <p className="text-xs text-muted-foreground">{cuisine.description}</p>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">营养目标（可多选）</h3>
                <div className="grid grid-cols-2 gap-2">
                  {nutritionGoals.map((goal) => (
                    <Button
                      key={goal.value}
                      variant={preferences.nutritionGoals.includes(goal.value) ? 'default' : 'outline'}
                      className="justify-start h-auto py-2"
                      onClick={() => toggleArrayPreference('nutritionGoals', goal.value)}
                    >
                      <span className="text-lg mr-2">{goal.icon}</span>
                      <div className="text-left">
                        <p className="text-sm font-medium">{goal.label}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

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
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i + 1 === step ? 'bg-primary' : i + 1 < step ? 'bg-primary/50' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {step}/{totalSteps}
          </span>
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Footer */}
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
              if (step < totalSteps) {
                setStep(step + 1)
              } else {
                // Save preferences and navigate
                console.log('Preferences saved:', preferences)
                navigate('/')
              }
            }}
            disabled={
              (step === 1 && !preferences.city) ||
              (step === 2 && getTotalPeople() === 0)
            }
          >
            {step === totalSteps ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                完成
              </>
            ) : (
              '下一步'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
