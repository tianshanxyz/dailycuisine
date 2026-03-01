-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE,
  wechat_openid VARCHAR(100) UNIQUE,
  alipay_userid VARCHAR(100) UNIQUE,
  city VARCHAR(50) NOT NULL,
  kitchen_equipment TEXT[] DEFAULT '{}',
  preferences JSONB DEFAULT '{
    "cuisine_types": [],
    "spice_level": "medium",
    "serving_size": 2,
    "dietary_restrictions": []
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 菜品表
CREATE TABLE IF NOT EXISTS dishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(20) NOT NULL CHECK (category IN ('meat', 'egg', 'vegetable', 'soup', 'staple', 'dessert')),
  cuisine_type VARCHAR(50),
  ingredients JSONB NOT NULL DEFAULT '[]',
  steps JSONB NOT NULL DEFAULT '[]',
  nutrition_info JSONB NOT NULL,
  cooking_time INTEGER NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  source_platform VARCHAR(20) CHECK (source_platform IN ('xiachufang', 'xiaohongshu', 'self')),
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 周计划表
CREATE TABLE IF NOT EXISTS weekly_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  meals JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_start_date)
);

-- 采购清单表
CREATE TABLE IF NOT EXISTS shopping_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_plan_id UUID REFERENCES weekly_plans(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '[]',
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  purchased BOOLEAN DEFAULT FALSE
);

-- 采购记录表
CREATE TABLE IF NOT EXISTS purchase_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shopping_list_id UUID REFERENCES shopping_lists(id) ON DELETE SET NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  store_name VARCHAR(200),
  notes TEXT
);

-- 搜索历史表
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  keyword VARCHAR(200) NOT NULL,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 厨房设备表
CREATE TABLE IF NOT EXISTS kitchen_equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  category VARCHAR(20) NOT NULL CHECK (category IN ('cooking', 'preparation', 'storage', 'appliance'))
);

-- 城市数据表
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  province VARCHAR(100) NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE
);

-- 创建索引
CREATE INDEX idx_dishes_category ON dishes(category);
CREATE INDEX idx_dishes_name ON dishes USING gin(to_tsvector('simple', name));
CREATE INDEX idx_dishes_tags ON dishes USING gin(tags);
CREATE INDEX idx_weekly_plans_user_id ON weekly_plans(user_id);
CREATE INDEX idx_shopping_lists_user_id ON shopping_lists(user_id);
CREATE INDEX idx_purchase_records_user_id ON purchase_records(user_id);
CREATE INDEX idx_purchase_records_date ON purchase_records(purchase_date);
CREATE INDEX idx_search_history_user_id ON search_history(user_id);
CREATE INDEX idx_search_history_searched_at ON search_history(searched_at DESC);

-- 插入默认厨房设备数据
INSERT INTO kitchen_equipment (name, icon, category) VALUES
  ('燃气灶', '🔥', 'cooking'),
  ('炒锅', '🍳', 'cooking'),
  ('蒸锅', '♨️', 'cooking'),
  ('微波炉', '📻', 'appliance'),
  ('电饭煲', '🍚', 'appliance'),
  ('搅拌机', '🥤', 'appliance'),
  ('烤箱', '🔥', 'appliance'),
  ('空气炸锅', '🍟', 'appliance'),
  ('冰箱', '❄️', 'storage'),
  ('菜板', '🔪', 'preparation'),
  ('刀具套装', '🔪', 'preparation');

-- 插入热门城市数据
INSERT INTO cities (name, province, is_popular) VALUES
  ('北京', '北京市', TRUE),
  ('上海', '上海市', TRUE),
  ('广州', '广东省', TRUE),
  ('深圳', '广东省', TRUE),
  ('杭州', '浙江省', TRUE),
  ('成都', '四川省', TRUE),
  ('重庆', '重庆市', TRUE),
  ('武汉', '湖北省', TRUE),
  ('西安', '陕西省', TRUE),
  ('南京', '江苏省', TRUE);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要的表创建更新时间触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dishes_updated_at BEFORE UPDATE ON dishes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weekly_plans_updated_at BEFORE UPDATE ON weekly_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全策略 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own plans" ON weekly_plans FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own plans" ON weekly_plans FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own plans" ON weekly_plans FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own plans" ON weekly_plans FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own shopping lists" ON shopping_lists FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own shopping lists" ON shopping_lists FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own shopping lists" ON shopping_lists FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own shopping lists" ON shopping_lists FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own purchase records" ON purchase_records FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own purchase records" ON purchase_records FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own purchase records" ON purchase_records FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own purchase records" ON purchase_records FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own search history" ON search_history FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own search history" ON search_history FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own search history" ON search_history FOR DELETE USING (auth.uid()::text = user_id::text);

-- 菜品表公开读取
CREATE POLICY "Dishes are viewable by everyone" ON dishes FOR SELECT USING (true);
