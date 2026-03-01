import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Clock, TrendingUp, Filter, ChefHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useSearch } from '@/hooks/useSearch'

export default function SearchPage() {
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchHistory,
    hotSearches,
    isSearching,
    selectedCategory,
    setSelectedCategory,
    selectedIngredient,
    setSelectedIngredient,
    categories,
    ingredients,
    search,
    clearSearchHistory
  } = useSearch()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    search(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索菜谱、食材..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
                autoFocus
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="space-y-3 p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium mb-2">分类</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">食材</p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <Button
                      key={ing}
                      variant={selectedIngredient === ing ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedIngredient(selectedIngredient === ing ? '' : ing)}
                    >
                      {ing}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4">
        {searchQuery || searchResults.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">
                找到 {searchResults.length} 个结果
              </p>
              {isSearching && <p className="text-sm text-primary">搜索中...</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {searchResults.map((dish) => (
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
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{dish.cooking_time}分钟</span>
                      <span>·</span>
                      <span>{dish.difficulty === 'easy' ? '简单' : dish.difficulty === 'medium' ? '中等' : '困难'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h2 className="font-semibold">搜索历史</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearchHistory}
                  >
                    清空
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearch(item.keyword)}
                    >
                      {item.keyword}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">热门搜索</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hotSearches.map((tag, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-3">按分类浏览</h2>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <Card
                    key={cat}
                    className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedCategory(cat)
                      handleSearch(cat)
                    }}
                  >
                    <p className="font-medium">{cat}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
