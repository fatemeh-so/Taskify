import supabase from '../supabase'

export async function AddTask({
  title,
  status,
  category,
  priority,
  description,created_at,user_id
}) {
  const { data, error } = await supabase
    .from('task')
    .insert([{ user_id,title, category, priority, status, description,created_at }])
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data
}
export async function getTask() {
  let { data, error } = await supabase.from('task').select('*')
  if (error) {
    throw new Error(error.message)
  }
  return data
}
export async function deleteTask(id) {
  const { error } = await supabase.from('task').delete().eq('id', id)
  if (error) {
    throw new Error(error.message)
  }
}
export async function editTask({
  id,
  title,
  category,
  priority,
  description,
  status,
  duration,
}) {
  const { data, error } = await supabase
    .from('task')
    .update({ title, category, priority, description, status, duration })
    .eq('id', id)
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data
}
