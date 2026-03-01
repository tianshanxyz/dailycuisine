import { useState } from 'react'
import { ShoppingCart, Check, Download, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockShoppingItems = [
  { id: '1', name: '五花肉', amount: 500, unit: '克', estimated_price: 25, category: '肉类', purchased: false },
  { id: '2', name: '番茄', amount: 3, unit: '个', estimated_price: 6, category: '蔬菜', purchased: true },
  { id: '3', name: '鸡蛋', amount: 10, unit: '个', estimated_price: 12, category: '蛋类', purchased: false },
  { id: '4', name: '豆腐', amount: 2, unit: '块', estimated_price: 8, category: '其他', purchased: false },
]

const mockPurchaseRecords = [
  { date: '2026-02-28', amount: 156.5, items: 12 },
  { date: '2026-02-21', amount: 203.8, items: 15 },
  { date: '2026-02-14', amount: 178.2, items: 11 },
]

export default function Shopping() {
  const [activeTab, setActiveTab] = useState<'list' | 'records'>('list')
  const [items, setItems] = useState(mockShoppingItems)

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ))
  }

  const totalEstimated = items.reduce((sum, item) => sum + item.estimated_price, 0)
  const purchasedCount = items.filter(item => item.purchased).length

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold mb-4">采购管理</h1>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'list' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setActiveTab('list')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              采购清单
            </Button>
            <Button
              variant={activeTab === 'records' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setActiveTab('records')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              采购记录
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4">
        {activeTab === 'list' ? (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">本周采购清单</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    导出
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>预估总价: ¥{totalEstimated.toFixed(2)}</span>
                  <span>已购: {purchasedCount}/{items.length}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.purchased ? 'bg-muted' : 'bg-background'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Button
                        variant={item.purchased ? 'default' : 'outline'}
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleItem(item.id)}
                      >
                        {item.purchased && <Check className="h-4 w-4" />}
                      </Button>
                      <div>
                        <p className={`font-medium ${item.purchased ? 'line-through text-muted-foreground' : ''}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.amount}{item.unit} · {item.category}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">¥{item.estimated_price}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">储存提示</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">冷藏食材</p>
                    <p className="text-muted-foreground">五花肉、豆腐需冷藏保存</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mt-1" />
                  <div>
                    <p className="font-medium">冷冻食材</p>
                    <p className="text-muted-foreground">暂无</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
                  <div>
                    <p className="font-medium">常温食材</p>
                    <p className="text-muted-foreground">番茄、鸡蛋可常温保存</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">本月采购统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">¥538.5</p>
                    <p className="text-xs text-muted-foreground">本月总支出</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">38</p>
                    <p className="text-xs text-muted-foreground">采购次数</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">采购记录</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPurchaseRecords.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{record.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {record.items} 种食材
                      </p>
                    </div>
                    <p className="font-medium text-primary">¥{record.amount}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
