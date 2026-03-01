import { useState } from 'react'
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

type TimeRange = 'week' | 'month' | 'quarter' | 'custom'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const mockPurchaseData = [
  { date: '2026-02-28', amount: 156.5, category: '肉类', items: 5 },
  { date: '2026-02-27', amount: 89.3, category: '蔬菜', items: 8 },
  { date: '2026-02-26', amount: 203.8, category: '综合', items: 12 },
  { date: '2026-02-25', amount: 45.2, category: '蛋类', items: 3 },
  { date: '2026-02-24', amount: 178.2, category: '肉类', items: 6 },
  { date: '2026-02-23', amount: 92.5, category: '蔬菜', items: 7 },
  { date: '2026-02-22', amount: 134.6, category: '综合', items: 9 },
]

const categoryData = [
  { name: '肉类', value: 450, amount: 450 },
  { name: '蔬菜', value: 280, amount: 280 },
  { name: '蛋类', value: 120, amount: 120 },
  { name: '调料', value: 85, amount: 85 },
  { name: '其他', value: 150, amount: 150 },
]

export default function PurchaseAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')

  const totalAmount = mockPurchaseData.reduce((sum, item) => sum + item.amount, 0)
  const avgDailyAmount = totalAmount / mockPurchaseData.length
  const totalItems = mockPurchaseData.reduce((sum, item) => sum + item.items, 0)

  const weeklyTrend = [
    { week: '第1周', amount: 580 },
    { week: '第2周', amount: 620 },
    { week: '第3周', amount: 540 },
    { week: '第4周', amount: 680 },
  ]

  const exportToCSV = () => {
    const headers = ['日期', '金额', '分类', '商品数量']
    const csvContent = [
      headers.join(','),
      ...mockPurchaseData.map(item => 
        [item.date, item.amount, item.category, item.items].join(',')
      )
    ].join('\n')
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `采购记录_${format(new Date(), 'yyyy-MM-dd')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = () => {
    const headers = ['日期', '金额', '分类', '商品数量']
    const excelContent = [
      headers.join('\t'),
      ...mockPurchaseData.map(item => 
        [item.date, item.amount, item.category, item.items].join('\t')
      )
    ].join('\n')
    
    const blob = new Blob(['\ufeff' + excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `采购记录_${format(new Date(), 'yyyy-MM-dd')}.xls`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-background border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold mb-4">采购分析</h1>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { key: 'week', label: '本周' },
              { key: 'month', label: '本月' },
              { key: 'quarter', label: '本季度' },
              { key: 'custom', label: '自定义' },
            ].map((item) => (
              <Button
                key={item.key}
                variant={timeRange === item.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(item.key as TimeRange)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {timeRange === 'custom' && (
            <div className="flex gap-2 mt-3">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
              <span className="flex items-center text-muted-foreground">至</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <DollarSign className="h-4 w-4 text-primary" />
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">¥{totalAmount.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground">总支出</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold mt-2">¥{avgDailyAmount.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground">日均支出</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <TrendingDown className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold mt-2">{totalItems}</p>
              <p className="text-xs text-muted-foreground">采购商品</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">支出趋势</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={exportToExcel}>
                  <Download className="h-3 w-3 mr-1" />
                  Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">分类占比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">每日支出</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPurchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MM/dd')} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'yyyy年MM月dd日', { locale: zhCN })}
                    formatter={(value: number) => `¥${value.toFixed(2)}`}
                  />
                  <Bar dataKey="amount" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">采购记录</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPurchaseData.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{format(new Date(record.date), 'MM月dd日', { locale: zhCN })}</p>
                  <p className="text-xs text-muted-foreground">
                    {record.category} · {record.items}种商品
                  </p>
                </div>
                <p className="font-medium text-primary">¥{record.amount.toFixed(2)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
