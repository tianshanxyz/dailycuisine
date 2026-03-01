import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format, addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const mealTypes = [
  { key: 'breakfast', label: '早餐', color: 'bg-orange-100' },
  { key: 'lunch', label: '午餐', color: 'bg-yellow-100' },
  { key: 'dinner', label: '晚餐', color: 'bg-purple-100' },
]

export default function Planning() {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  )

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const previousWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1))
  const nextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1))

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">周菜谱规划</h1>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              AI推荐
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={previousWeek}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <p className="font-medium">
                {format(currentWeekStart, 'yyyy年MM月dd日', { locale: zhCN })}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(addDays(currentWeekStart, 6), 'MM月dd日', { locale: zhCN })}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={nextWeek}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4">
        <div className="space-y-4">
          {weekDays.map((day) => (
            <Card key={day.toISOString()}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {format(day, 'EEEE', { locale: zhCN })}
                  <span className="text-muted-foreground font-normal ml-2">
                    {format(day, 'MM月dd日', { locale: zhCN })}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mealTypes.map((meal) => (
                  <div
                    key={meal.key}
                    className={`${meal.color} rounded-lg p-3 flex items-center justify-between`}
                  >
                    <div>
                      <p className="font-medium text-sm">{meal.label}</p>
                      <p className="text-xs text-muted-foreground">点击添加菜品</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
