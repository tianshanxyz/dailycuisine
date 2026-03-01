import { useState } from 'react'
import { User, Settings, ChefHat, MapPin, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const kitchenEquipment = [
  { id: 'gas_stove', name: '燃气灶', icon: '🔥' },
  { id: 'wok', name: '炒锅', icon: '🍳' },
  { id: 'steamer', name: '蒸锅', icon: '♨️' },
  { id: 'microwave', name: '微波炉', icon: '📻' },
  { id: 'rice_cooker', name: '电饭煲', icon: '🍚' },
  { id: 'blender', name: '搅拌机', icon: '🥤' },
  { id: 'oven', name: '烤箱', icon: '🔥' },
  { id: 'air_fryer', name: '空气炸锅', icon: '🍟' },
]

const popularCities = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '武汉', '西安', '南京'
]

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [showCitySelector, setShowCitySelector] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])

  const toggleEquipment = (id: string) => {
    setSelectedEquipment(prev =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>登录 / 注册</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="验证码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">获取验证码</Button>
              </div>
            </div>
            
            <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
              手机号登录
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  或使用以下方式登录
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <span className="mr-2">💬</span>
                微信登录
              </Button>
              <Button variant="outline" className="w-full">
                <span className="mr-2">💳</span>
                支付宝登录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/10 to-background p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">用户昵称</h2>
              <p className="text-sm text-muted-foreground">{phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              所在城市
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCity ? (
              <div className="flex items-center justify-between">
                <p className="font-medium">{selectedCity}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCitySelector(true)}
                >
                  修改
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCitySelector(true)}
              >
                选择城市
              </Button>
            )}
            
            {showCitySelector && (
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-5 gap-2">
                  {popularCities.map((city) => (
                    <Button
                      key={city}
                      variant={selectedCity === city ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setSelectedCity(city)
                        setShowCitySelector(false)
                      }}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              厨房设备
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              选择您现有的厨房设备，帮助我们推荐合适的菜谱
            </p>
            <div className="grid grid-cols-2 gap-2">
              {kitchenEquipment.map((equipment) => (
                <Button
                  key={equipment.id}
                  variant={selectedEquipment.includes(equipment.id) ? 'default' : 'outline'}
                  size="sm"
                  className="justify-start"
                  onClick={() => toggleEquipment(equipment.id)}
                >
                  <span className="mr-2">{equipment.icon}</span>
                  {equipment.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                设置
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive"
                onClick={() => setIsLoggedIn(false)}
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
