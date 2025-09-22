import { supabase } from "./supabase"

export interface Category {
    name: string,
    type: 'income' | 'expense',
    user_id: string
}

export const addDefaultCategories = async (userId: string) => {
    const defaultCategories: Category[] = [
    { name: 'Salary', type: 'income', user_id: userId },
    { name: 'Bonus', type: 'income', user_id: userId },
    { name: 'Food', type: 'expense', user_id: userId },
    { name: 'Transport', type: 'expense', user_id: userId },
    { name: 'Entertainment', type: 'expense', user_id: userId },
    { name: 'Shopping', type: 'expense', user_id: userId },
    { name: 'Bills', type: 'expense', user_id: userId },
    { name: 'Health', type: 'expense', user_id: userId },
  ]

   const { error } = await supabase
    .from('categories')
    .upsert(defaultCategories, { ignoreDuplicates: true })
  if (error) console.error('Error adding default categories:', error)
}

export const ensureDefaultCategories = async (userId: string) => {
  const { data: existing, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)

  if (!existing || existing.length === 0) {
    await addDefaultCategories(userId)
  }
}