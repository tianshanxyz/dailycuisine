import { supabase } from './supabase'
import type { WeeklyPlan, DailyMeal, ShoppingList, ShoppingItem } from '@/types'

export async function getWeeklyPlan(userId: string, weekStartDate: string): Promise<WeeklyPlan | null> {
  const { data, error } = await supabase
    .from('weekly_plans')
    .select('*')
    .eq('user_id', userId)
    .eq('week_start_date', weekStartDate)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data as WeeklyPlan
}

export async function createOrUpdateWeeklyPlan(params: {
  userId: string
  weekStartDate: string
  meals: DailyMeal[]
}): Promise<WeeklyPlan> {
  const { data, error } = await supabase
    .from('weekly_plans')
    .upsert({
      user_id: params.userId,
      week_start_date: params.weekStartDate,
      meals: params.meals,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error

  return data as WeeklyPlan
}

export async function addDishToPlan(params: {
  planId: string
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
  dishId: string
}): Promise<void> {
  const { data: plan, error: fetchError } = await supabase
    .from('weekly_plans')
    .select('meals')
    .eq('id', params.planId)
    .single()

  if (fetchError) throw fetchError

  const meals = plan.meals as DailyMeal[]
  const dayMeal = meals.find((m) => m.date === params.date)

  if (dayMeal) {
    dayMeal[params.mealType].push(params.dishId)
  } else {
    meals.push({
      date: params.date,
      breakfast: params.mealType === 'breakfast' ? [params.dishId] : [],
      lunch: params.mealType === 'lunch' ? [params.dishId] : [],
      dinner: params.mealType === 'dinner' ? [params.dishId] : [],
    })
  }

  const { error: updateError } = await supabase
    .from('weekly_plans')
    .update({ meals, updated_at: new Date().toISOString() })
    .eq('id', params.planId)

  if (updateError) throw updateError
}

export async function generateShoppingList(weekPlanId: string): Promise<ShoppingList> {
  const { data: plan, error: planError } = await supabase
    .from('weekly_plans')
    .select('meals')
    .eq('id', weekPlanId)
    .single()

  if (planError) throw planError

  const dishIds = (plan.meals as DailyMeal[]).flatMap((day) => [
    ...day.breakfast,
    ...day.lunch,
    ...day.dinner,
  ])

  const { data: dishes, error: dishesError } = await supabase
    .from('dishes')
    .select('ingredients, name')
    .in('id', dishIds)

  if (dishesError) throw dishesError

  const ingredientMap = new Map<string, ShoppingItem>()

  dishes.forEach((dish) => {
    const ingredients = dish.ingredients as any[]
    ingredients.forEach((ing) => {
      const key = `${ing.name}-${ing.unit}`
      const existing = ingredientMap.get(key)

      if (existing) {
        existing.amount += ing.amount
        existing.estimated_price += ing.estimated_price || 0
        existing.dish_names.push(dish.name)
      } else {
        ingredientMap.set(key, {
          id: crypto.randomUUID(),
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          estimated_price: ing.estimated_price || 0,
          storage_type: ing.storage_type || 'room',
          storage_note: ing.storage_note || '',
          category: ing.category || 'other',
          purchased: false,
          dish_names: [dish.name],
        })
      }
    })
  })

  const items = Array.from(ingredientMap.values())

  const { data: shoppingList, error: listError } = await supabase
    .from('shopping_lists')
    .insert({
      week_plan_id: weekPlanId,
      items,
      generated_at: new Date().toISOString(),
      purchased: false,
    })
    .select()
    .single()

  if (listError) throw listError

  return shoppingList as ShoppingList
}

export async function getShoppingList(weekPlanId: string): Promise<ShoppingList | null> {
  const { data, error } = await supabase
    .from('shopping_lists')
    .select('*')
    .eq('week_plan_id', weekPlanId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data as ShoppingList
}

export async function updateShoppingItem(
  listId: string,
  itemId: string,
  purchased: boolean
): Promise<void> {
  const { data: list, error: fetchError } = await supabase
    .from('shopping_lists')
    .select('items')
    .eq('id', listId)
    .single()

  if (fetchError) throw fetchError

  const items = (list.items as ShoppingItem[]).map((item) =>
    item.id === itemId ? { ...item, purchased } : item
  )

  const { error: updateError } = await supabase
    .from('shopping_lists')
    .update({ items })
    .eq('id', listId)

  if (updateError) throw updateError
}
