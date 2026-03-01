import { useNavigate } from 'react-router-dom'
import { Search, ChefHat, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const navigate = useNavigate()

  const hotSearches = ['红烧肉', '番茄炒蛋', '宫保鸡丁', '麻婆豆腐', '清蒸鱼']
  const recommendedDishes = [
    { id: '1', name: '红烧肉', image: '/placeholder-dish.jpg', time: '45分钟', difficulty: '中等' },
    { id: '2', name: '番茄炒蛋', image: '/placeholder-dish.jpg', time: '15分钟', difficulty: '简单' },
    { id: '3', name: '清蒸鲈鱼', image: '/placeholder-dish.jpg', time: '30分钟', difficulty: '中等' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/10 to-background p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">每天家常菜</h1>
          <p className="text-muted-foreground mb-6">智能规划，营养均衡</p>
          
          <div 
            className="relative cursor-pointer"
            onClick={() => navigate('/search')}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <div className="h-10 w-full rounded-md border border-input bg-background pl-10 flex items-center text-muted-foreground">
              搜索菜谱、食材...
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">热门搜索</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {hotSearches.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                onClick={() => navigate(`/search?q=${tag}`)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <ChefHat className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">今日推荐</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recommendedDishes.map((dish) => (
              <Card 
                key={dish.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/dish/${dish.id}`)}
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <ChefHat className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium mb-1">{dish.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{dish.time}</span>
                    <span>·</span>
                    <span>{dish.difficulty}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg">
          开始规划本周菜谱
        </Button>
      </div>
    </div>
  )
}
