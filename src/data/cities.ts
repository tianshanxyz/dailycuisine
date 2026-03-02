// 全国主要城市数据
export interface City {
  code: string
  name: string
  province: string
  region: 'north' | 'south' | 'east' | 'west' | 'central'
  cuisine: string[]
  seasonalIngredients: Record<string, string[]> // 按月份存储时令食材
}

export const cities: City[] = [
  // 一线城市
  { code: 'bj', name: '北京', province: '北京市', region: 'north', cuisine: ['京菜', '鲁菜', '宫廷菜'], seasonalIngredients: {
    '1': ['大白菜', '萝卜', '羊肉'], '2': ['韭菜', '菠菜', '鲫鱼'], '3': ['春笋', '香椿', '荠菜'],
    '4': ['豌豆', '蒜苗', '带鱼'], '5': ['黄瓜', '茄子', '小龙虾'], '6': ['西红柿', '苦瓜', '扇贝'],
    '7': ['西瓜', '桃子', '黄花鱼'], '8': ['葡萄', '梨', '螃蟹'], '9': ['南瓜', '莲藕', '鲈鱼'],
    '10': ['山药', '板栗', '大闸蟹'], '11': ['白菜', '萝卜', '羊肉'], '12': ['白菜', '萝卜', '羊肉']
  }},
  { code: 'sh', name: '上海', province: '上海市', region: 'east', cuisine: ['沪菜', '本帮菜', '淮扬菜'], seasonalIngredients: {
    '1': ['青菜', '冬笋', '河鳗'], '2': ['荠菜', '马兰头', '刀鱼'], '3': ['春笋', '香椿', '鲥鱼'],
    '4': ['蚕豆', '豌豆', '黄鱼'], '5': ['空心菜', '茄子', '小龙虾'], '6': ['冬瓜', '丝瓜', '带鱼'],
    '7': ['西瓜', '桃子', '梭子蟹'], '8': ['葡萄', '梨', '东海带鱼'], '9': ['莲藕', '茭白', '大闸蟹'],
    '10': ['芋艿', '板栗', '阳澄湖蟹'], '11': ['白菜', '萝卜', '鳗鱼'], '12': ['青菜', '冬笋', '河鳗']
  }},
  { code: 'gz', name: '广州', province: '广东省', region: 'south', cuisine: ['粤菜', '潮汕菜', '客家菜'], seasonalIngredients: {
    '1': ['菜心', '芥兰', '腊味'], '2': ['生菜', '春菜', '鲮鱼'], '3': ['春笋', '枸杞叶', '马鲛鱼'],
    '4': ['通菜', '豆角', '鲳鱼'], '5': ['苦瓜', '丝瓜', '石斑鱼'], '6': ['冬瓜', '节瓜', '花蟹'],
    '7': ['南瓜', '茄子', '濑尿虾'], '8': ['莲藕', '芋头', '膏蟹'], '9': ['芥菜', '茼蒿', '鲈鱼'],
    '10': ['白菜', '萝卜', '鲷鱼'], '11': ['菜心', '芥兰', '腊味'], '12': ['生菜', '春菜', '鲮鱼']
  }},
  { code: 'sz', name: '深圳', province: '广东省', region: 'south', cuisine: ['粤菜', '潮汕菜', '海鲜'], seasonalIngredients: {
    '1': ['菜心', '芥兰', '海鲜'], '2': ['生菜', '春菜', '海鲜'], '3': ['春笋', '枸杞叶', '海鲜'],
    '4': ['通菜', '豆角', '海鲜'], '5': ['苦瓜', '丝瓜', '海鲜'], '6': ['冬瓜', '节瓜', '海鲜'],
    '7': ['南瓜', '茄子', '海鲜'], '8': ['莲藕', '芋头', '海鲜'], '9': ['芥菜', '茼蒿', '海鲜'],
    '10': ['白菜', '萝卜', '海鲜'], '11': ['菜心', '芥兰', '海鲜'], '12': ['生菜', '春菜', '海鲜']
  }},
  { code: 'hz', name: '杭州', province: '浙江省', region: 'east', cuisine: ['杭帮菜', '浙菜', '江南菜'], seasonalIngredients: {
    '1': ['冬笋', '青菜', '西湖醋鱼'], '2': ['春笋', '荠菜', '龙井虾仁'], '3': ['春笋', '香椿', '西湖醋鱼'],
    '4': ['蚕豆', '豌豆', '东坡肉'], '5': ['西湖莼菜', '荷叶', '叫花鸡'], '6': ['冬瓜', '丝瓜', '西湖醋鱼'],
    '7': ['西瓜', '桃子', '西湖醋鱼'], '8': ['葡萄', '梨', '西湖醋鱼'], '9': ['莲藕', '菱角', '西湖醋鱼'],
    '10': ['板栗', '桂花', '西湖醋鱼'], '11': ['冬笋', '青菜', '西湖醋鱼'], '12': ['冬笋', '青菜', '西湖醋鱼']
  }},
  { code: 'cd', name: '成都', province: '四川省', region: 'west', cuisine: ['川菜', '火锅', '小吃'], seasonalIngredients: {
    '1': ['白菜', '萝卜', '腊肉'], '2': ['韭菜', '菠菜', '鲫鱼'], '3': ['春笋', '香椿', '河鲜'],
    '4': ['豌豆', '蒜苗', '鳝鱼'], '5': ['黄瓜', '茄子', '小龙虾'], '6': ['西红柿', '苦瓜', '河鲜'],
    '7': ['西瓜', '桃子', '河鲜'], '8': ['葡萄', '梨', '河鲜'], '9': ['南瓜', '莲藕', '河鲜'],
    '10': ['山药', '板栗', '河鲜'], '11': ['白菜', '萝卜', '腊肉'], '12': ['白菜', '萝卜', '腊肉']
  }},
  { code: 'cq', name: '重庆', province: '重庆市', region: 'west', cuisine: ['川菜', '火锅', '江湖菜'], seasonalIngredients: {
    '1': ['白菜', '萝卜', '腊肉'], '2': ['韭菜', '菠菜', '鲫鱼'], '3': ['春笋', '香椿', '河鲜'],
    '4': ['豌豆', '蒜苗', '鳝鱼'], '5': ['黄瓜', '茄子', '小龙虾'], '6': ['西红柿', '苦瓜', '河鲜'],
    '7': ['西瓜', '桃子', '河鲜'], '8': ['葡萄', '梨', '河鲜'], '9': ['南瓜', '莲藕', '河鲜'],
    '10': ['山药', '板栗', '河鲜'], '11': ['白菜', '萝卜', '腊肉'], '12': ['白菜', '萝卜', '腊肉']
  }},
  { code: 'wh', name: '武汉', province: '湖北省', region: 'central', cuisine: ['鄂菜', '楚菜', '小吃'], seasonalIngredients: {
    '1': ['白菜', '萝卜', '武昌鱼'], '2': ['韭菜', '菠菜', '武昌鱼'], '3': ['春笋', '香椿', '武昌鱼'],
    '4': ['豌豆', '蒜苗', '武昌鱼'], '5': ['黄瓜', '茄子', '小龙虾'], '6': ['西红柿', '苦瓜', '武昌鱼'],
    '7': ['西瓜', '桃子', '武昌鱼'], '8': ['葡萄', '梨', '武昌鱼'], '9': ['南瓜', '莲藕', '武昌鱼'],
    '10': ['山药', '板栗', '武昌鱼'], '11': ['白菜', '萝卜', '武昌鱼'], '12': ['白菜', '萝卜', '武昌鱼']
  }},
  { code: 'xa', name: '西安', province: '陕西省', region: 'north', cuisine: ['陕菜', '西北菜', '面食'], seasonalIngredients: {
    '1': ['白菜', '萝卜', '羊肉'], '2': ['韭菜', '菠菜', '羊肉'], '3': ['春笋', '香椿', '羊肉'],
    '4': ['豌豆', '蒜苗', '羊肉'], '5': ['黄瓜', '茄子', '羊肉'], '6': ['西红柿', '苦瓜', '羊肉'],
    '7': ['西瓜', '桃子', '羊肉'], '8': ['葡萄', '梨', '羊肉'], '9': ['南瓜', '莲藕', '羊肉'],
    '10': ['山药', '板栗', '羊肉'], '11': ['白菜', '萝卜', '羊肉'], '12': ['白菜', '萝卜', '羊肉']
  }},
  { code: 'nj', name: '南京', province: '江苏省', region: 'east', cuisine: ['苏菜', '金陵菜', '淮扬菜'], seasonalIngredients: {
    '1': ['青菜', '冬笋', '盐水鸭'], '2': ['荠菜', '马兰头', '盐水鸭'], '3': ['春笋', '香椿', '盐水鸭'],
    '4': ['蚕豆', '豌豆', '盐水鸭'], '5': ['空心菜', '茄子', '盐水鸭'], '6': ['冬瓜', '丝瓜', '盐水鸭'],
    '7': ['西瓜', '桃子', '盐水鸭'], '8': ['葡萄', '梨', '盐水鸭'], '9': ['莲藕', '茭白', '盐水鸭'],
    '10': ['芋艿', '板栗', '盐水鸭'], '11': ['白菜', '萝卜', '盐水鸭'], '12': ['青菜', '冬笋', '盐水鸭']
  }},
  // 更多城市...
  { code: 'tj', name: '天津', province: '天津市', region: 'north', cuisine: ['津菜', '海鲜', '小吃'], seasonalIngredients: {} },
  { code: 'sy', name: '沈阳', province: '辽宁省', region: 'north', cuisine: ['东北菜', '辽菜', '烧烤'], seasonalIngredients: {} },
  { code: 'dl', name: '大连', province: '辽宁省', region: 'north', cuisine: ['海鲜', '东北菜', '日料'], seasonalIngredients: {} },
  { code: 'hrb', name: '哈尔滨', province: '黑龙江省', region: 'north', cuisine: ['东北菜', '俄式菜', '烧烤'], seasonalIngredients: {} },
  { code: 'jn', name: '济南', province: '山东省', region: 'north', cuisine: ['鲁菜', '海鲜', '小吃'], seasonalIngredients: {} },
  { code: 'qd', name: '青岛', province: '山东省', region: 'north', cuisine: ['海鲜', '鲁菜', '啤酒'], seasonalIngredients: {} },
  { code: 'zz', name: '郑州', province: '河南省', region: 'central', cuisine: ['豫菜', '面食', '小吃'], seasonalIngredients: {} },
  { code: 'cs', name: '长沙', province: '湖南省', region: 'central', cuisine: ['湘菜', '小吃', '夜宵'], seasonalIngredients: {} },
  { code: 'fz', name: '福州', province: '福建省', region: 'east', cuisine: ['闽菜', '海鲜', '小吃'], seasonalIngredients: {} },
  { code: 'xm', name: '厦门', province: '福建省', region: 'east', cuisine: ['闽菜', '海鲜', '台湾菜'], seasonalIngredients: {} },
  { code: 'hf', name: '合肥', province: '安徽省', region: 'east', cuisine: ['徽菜', '小吃', '江鲜'], seasonalIngredients: {} },
  { code: 'nc', name: '南昌', province: '江西省', region: 'east', cuisine: ['赣菜', '米粉', '瓦罐汤'], seasonalIngredients: {} },
  { code: 'km', name: '昆明', province: '云南省', region: 'west', cuisine: ['滇菜', '菌菇', '民族菜'], seasonalIngredients: {} },
  { code: 'gy', name: '贵阳', province: '贵州省', region: 'west', cuisine: ['黔菜', '酸汤', '小吃'], seasonalIngredients: {} },
  { code: 'lz', name: '兰州', province: '甘肃省', region: 'west', cuisine: ['西北菜', '面食', '牛羊肉'], seasonalIngredients: {} },
  { code: 'nn', name: '南宁', province: '广西壮族自治区', region: 'south', cuisine: ['桂菜', '米粉', '东南亚菜'], seasonalIngredients: {} },
  { code: 'hk', name: '海口', province: '海南省', region: 'south', cuisine: ['海南菜', '海鲜', '热带水果'], seasonalIngredients: {} },
  { code: 'sanya', name: '三亚', province: '海南省', region: 'south', cuisine: ['海南菜', '海鲜', '热带水果'], seasonalIngredients: {} },
  { code: 'ty', name: '太原', province: '山西省', region: 'north', cuisine: ['晋菜', '面食', '醋'], seasonalIngredients: {} },
  { code: 'shijiazhuang', name: '石家庄', province: '河北省', region: 'north', cuisine: ['冀菜', '驴肉', '面食'], seasonalIngredients: {} },
  { code: 'wulumuqi', name: '乌鲁木齐', province: '新疆维吾尔自治区', region: 'west', cuisine: ['新疆菜', '牛羊肉', '面食'], seasonalIngredients: {} },
  { code: 'huhehaote', name: '呼和浩特', province: '内蒙古自治区', region: 'north', cuisine: ['蒙餐', '牛羊肉', '奶制品'], seasonalIngredients: {} },
  { code: 'lasa', name: '拉萨', province: '西藏自治区', region: 'west', cuisine: ['藏餐', '牛羊肉', '糌粑'], seasonalIngredients: {} },
  { code: 'yinchuan', name: '银川', province: '宁夏回族自治区', region: 'west', cuisine: ['西北菜', '牛羊肉', '面食'], seasonalIngredients: {} },
  { code: 'xining', name: '西宁', province: '青海省', region: 'west', cuisine: ['西北菜', '牛羊肉', '酸奶'], seasonalIngredients: {} }
]

// 按省份分组
export const citiesByProvince = cities.reduce((acc, city) => {
  if (!acc[city.province]) {
    acc[city.province] = []
  }
  acc[city.province].push(city)
  return acc
}, {} as Record<string, City[]>)

// 热门城市
export const popularCities = cities.filter(city => 
  ['bj', 'sh', 'gz', 'sz', 'hz', 'cd', 'cq', 'wh', 'xa', 'nj'].includes(city.code)
)

// 获取当前城市的时令食材
export function getSeasonalIngredients(cityCode: string, month?: number): string[] {
  const city = cities.find(c => c.code === cityCode)
  if (!city) return []
  
  const currentMonth = month || new Date().getMonth() + 1
  return city.seasonalIngredients[currentMonth.toString()] || []
}

// 根据城市推荐菜系
export function getRecommendedCuisines(cityCode: string): string[] {
  const city = cities.find(c => c.code === cityCode)
  return city?.cuisine || ['家常菜']
}
