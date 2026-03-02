// 用户偏好设置数据

// 辣度选项
export const spiceLevels = [
  { value: 'none', label: '不辣', description: '完全不吃辣', icon: '🌱' },
  { value: 'mild', label: '微辣', description: '轻微辣味', icon: '🌶️' },
  { value: 'medium', label: '中辣', description: '适中辣度', icon: '🌶️🌶️' },
  { value: 'hot', label: '特辣', description: '重度嗜辣', icon: '🌶️🌶️🌶️' },
  { value: 'extreme', label: '变态辣', description: '极限挑战', icon: '🔥' }
]

// 口味倾向
export const tastePreferences = [
  { value: 'sour', label: '酸甜', description: '糖醋、番茄等', icon: '🍋' },
  { value: 'salty', label: '咸鲜', description: '清淡、鲜美', icon: '🧂' },
  { value: 'spicy', label: '香辣', description: '麻辣、香辣', icon: '🌶️' },
  { value: 'sweet', label: '甜口', description: '蜜汁、甜糯', icon: '🍯' },
  { value: 'savory', label: '酱香', description: '红烧、酱爆', icon: '🥘' },
  { value: 'light', label: '清淡', description: '清蒸、白灼', icon: '🥗' },
  { value: 'rich', label: '浓郁', description: '奶油、芝士', icon: '🧀' },
  { value: 'fresh', label: '清爽', description: '凉拌、生食', icon: '🥒' }
]

// 饮食禁忌
export const dietaryRestrictions = [
  { value: 'vegetarian', label: '素食', description: '不吃肉类', icon: '🥬' },
  { value: 'vegan', label: '纯素', description: '不吃任何动物制品', icon: '🌱' },
  { value: 'halal', label: '清真', description: '符合伊斯兰教规', icon: '🕌' },
  { value: 'kosher', label: '犹太洁食', description: '符合犹太教规', icon: '✡️' },
  { value: 'no-seafood', label: '无海鲜', description: '不吃鱼虾等海鲜', icon: '🚫🦐' },
  { value: 'no-beef', label: '不吃牛肉', description: '宗教或个人原因', icon: '🚫🐄' },
  { value: 'no-pork', label: '不吃猪肉', description: '宗教或个人原因', icon: '🚫🐷' },
  { value: 'no-mutton', label: '不吃羊肉', description: '不喜欢羊肉膻味', icon: '🚫🐑' },
  { value: 'low-sodium', label: '低盐', description: '控制盐分摄入', icon: '🧂⬇️' },
  { value: 'low-sugar', label: '低糖', description: '控制糖分摄入', icon: '🍬⬇️' },
  { value: 'low-fat', label: '低脂', description: '控制脂肪摄入', icon: '🥩⬇️' },
  { value: 'gluten-free', label: '无麸质', description: '麸质过敏或乳糜泻', icon: '🌾🚫' },
  { value: 'dairy-free', label: '无乳制品', description: '乳糖不耐受', icon: '🥛🚫' },
  { value: 'nut-free', label: '无坚果', description: '坚果过敏', icon: '🥜🚫' }
]

// 用餐人数选项
export const servingOptions = [
  { value: 1, label: '1人', description: '独食', icon: '👤' },
  { value: 2, label: '2人', description: '情侣/夫妻', icon: '👫' },
  { value: 3, label: '3人', description: '小家庭', icon: '👨‍👩‍👧' },
  { value: 4, label: '4人', description: '标准家庭', icon: '👨‍👩‍👧‍👦' },
  { value: 5, label: '5人', description: '三代同堂', icon: '👨‍👩‍👧‍👦👴' },
  { value: 6, label: '6人', description: '大家庭', icon: '👨‍👩‍👧‍👦👨‍👩‍👧' },
  { value: 7, label: '7人', description: '聚餐', icon: '🎉' },
  { value: 8, label: '8人', description: '聚会', icon: '🎊' },
  { value: 10, label: '10人+', description: '宴请/团建', icon: '🥂' }
]

// 家庭成员类型
export const familyMemberTypes = [
  { value: 'adult', label: '成年人', description: '18-60岁', icon: '👨', multiplier: 1 },
  { value: 'senior', label: '老年人', description: '60岁以上', icon: '👴', multiplier: 0.8 },
  { value: 'teen', label: '青少年', description: '12-18岁', icon: '🧑', multiplier: 0.9 },
  { value: 'child', label: '儿童', description: '6-12岁', icon: '👦', multiplier: 0.6 },
  { value: 'toddler', label: '幼儿', description: '3-6岁', icon: '👶', multiplier: 0.4 },
  { value: 'baby', label: '婴儿', description: '0-3岁', icon: '🍼', multiplier: 0.2 }
]

// 烹饪难度
export const difficultyLevels = [
  { value: 'easy', label: '简单', description: '新手友好', time: '15-30分钟', icon: '⭐' },
  { value: 'medium', label: '中等', description: '有一定基础', time: '30-60分钟', icon: '⭐⭐' },
  { value: 'hard', label: '困难', description: '需要技巧', time: '60分钟以上', icon: '⭐⭐⭐' }
]

// 烹饪时间选项
export const cookingTimeOptions = [
  { value: 15, label: '15分钟内', description: '快手菜', icon: '⚡' },
  { value: 30, label: '30分钟内', description: '日常菜', icon: '⏱️' },
  { value: 60, label: '1小时内', description: '周末菜', icon: '🕐' },
  { value: 120, label: '2小时内', description: '宴客菜', icon: '🕑' },
  { value: 0, label: '不限时', description: '慢炖/复杂菜', icon: '♾️' }
]

// 菜系选项
export const cuisineOptions = [
  { value: 'sichuan', label: '川菜', description: '麻辣鲜香', icon: '🌶️', region: 'west' },
  { value: 'cantonese', label: '粤菜', description: '清淡鲜美', icon: '🥟', region: 'south' },
  { value: 'shandong', label: '鲁菜', description: '咸鲜纯正', icon: '🦐', region: 'north' },
  { value: 'jiangsu', label: '苏菜', description: '甜咸适中', icon: '🍜', region: 'east' },
  { value: 'zhejiang', label: '浙菜', description: '清鲜爽脆', icon: '🐟', region: 'east' },
  { value: 'fujian', label: '闽菜', description: '鲜香酸甜', icon: '🦪', region: 'east' },
  { value: 'hunan', label: '湘菜', description: '香辣浓郁', icon: '🌶️', region: 'central' },
  { value: 'anhui', label: '徽菜', description: '重油重色', icon: '🍖', region: 'east' },
  { value: 'beijing', label: '京菜', description: '宫廷风味', icon: '🦆', region: 'north' },
  { value: 'shanghai', label: '沪菜', description: '浓油赤酱', icon: '🥢', region: 'east' },
  { value: 'northeast', label: '东北菜', description: '量大味浓', icon: '🥘', region: 'north' },
  { value: 'northwest', label: '西北菜', description: '面食为主', icon: '🍜', region: 'west' },
  { value: 'yunnan', label: '滇菜', description: '民族特色', icon: '🍄', region: 'west' },
  { value: 'guizhou', label: '黔菜', description: '酸辣开胃', icon: '🌶️', region: 'west' },
  { value: 'xinjiang', label: '新疆菜', description: '牛羊肉香', icon: '🍖', region: 'west' },
  { value: 'taiwan', label: '台湾菜', description: '小吃丰富', icon: '🧋', region: 'east' },
  { value: 'home', label: '家常菜', description: '日常美味', icon: '🏠', region: 'all' },
  { value: 'western', label: '西餐', description: '西式料理', icon: '🍽️', region: 'all' },
  { value: 'japanese', label: '日料', description: '日式料理', icon: '🍣', region: 'all' },
  { value: 'korean', label: '韩餐', description: '韩式料理', icon: '🥘', region: 'all' },
  { value: 'southeast', label: '东南亚菜', description: '热带风味', icon: '🥥', region: 'all' }
]

// 营养需求
export const nutritionGoals = [
  { value: 'balanced', label: '均衡营养', description: '蛋白质、碳水、脂肪均衡', icon: '⚖️' },
  { value: 'high-protein', label: '高蛋白', description: '增肌/健身', icon: '💪' },
  { value: 'low-carb', label: '低碳水', description: '减脂/控糖', icon: '📉' },
  { value: 'high-fiber', label: '高纤维', description: '促进消化', icon: '🌾' },
  { value: 'vitamin-rich', label: '维生素丰富', description: '增强免疫力', icon: '🍊' },
  { value: 'calcium-rich', label: '高钙', description: '骨骼健康', icon: '🥛' },
  { value: 'iron-rich', label: '高铁', description: '补血养气', icon: '🥩' }
]

// 餐次类型
export const mealTypes = [
  { value: 'breakfast', label: '早餐', description: '营养丰富', icon: '🌅', time: '07:00-09:00' },
  { value: 'lunch', label: '午餐', description: '能量补充', icon: '☀️', time: '11:30-13:30' },
  { value: 'dinner', label: '晚餐', description: '轻松清淡', icon: '🌙', time: '17:30-19:30' },
  { value: 'snack', label: '加餐', description: '小食点心', icon: '🍪', time: 'anytime' }
]

// 场景化套餐配置
export const mealScenarios = [
  {
    id: 'couple',
    name: '二人世界',
    description: '适合情侣或夫妻',
    icon: '💑',
    members: { adult: 2 },
    defaultConfig: { meat: 1, vegetable: 1, soup: 1, staple: 1 }
  },
  {
    id: 'small-family',
    name: '三口之家',
    description: '有孩子的年轻家庭',
    icon: '👨‍👩‍👧',
    members: { adult: 2, child: 1 },
    defaultConfig: { meat: 2, vegetable: 2, soup: 1, staple: 1, egg: 1 }
  },
  {
    id: 'standard-family',
    name: '标准家庭',
    description: '两个孩子的一家四口',
    icon: '👨‍👩‍👧‍👦',
    members: { adult: 2, child: 2 },
    defaultConfig: { meat: 2, vegetable: 2, soup: 1, staple: 1, egg: 1 }
  },
  {
    id: 'three-generations',
    name: '三代同堂',
    description: '包含老人和孩子',
    icon: '👨‍👩‍👧‍👦👴',
    members: { adult: 2, senior: 2, child: 1 },
    defaultConfig: { meat: 3, vegetable: 3, soup: 1, staple: 1, egg: 1 }
  },
  {
    id: 'big-family',
    name: '大家庭',
    description: '6人以上的大家庭',
    icon: '🏠',
    members: { adult: 4, child: 2 },
    defaultConfig: { meat: 4, vegetable: 4, soup: 1, staple: 1, egg: 2 }
  },
  {
    id: 'diet-control',
    name: '减脂餐',
    description: '低卡高蛋白',
    icon: '💪',
    members: { adult: 1 },
    defaultConfig: { meat: 1, vegetable: 2, soup: 1, staple: 0 }
  },
  {
    id: 'vegetarian',
    name: '素食餐',
    description: '纯素或蛋奶素',
    icon: '🥬',
    members: { adult: 1 },
    defaultConfig: { vegetable: 3, soup: 1, staple: 1, egg: 1 }
  },
  {
    id: 'kids-meal',
    name: '儿童餐',
    description: '营养均衡易消化',
    icon: '👶',
    members: { child: 1 },
    defaultConfig: { meat: 1, vegetable: 1, soup: 1, staple: 1, egg: 1 }
  }
]
