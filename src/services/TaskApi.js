import supabase from '../supabase'

export async function AddTask({ title, status,category, priority, description }) {
  const { data, error } = await supabase
    .from('task')
    .insert([{ title, category, priority, status,description }])
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
export async function editTask({ id, title, category, priority, description,status }) {
  const { data, error } = await supabase
    .from('task')
    .update({ title, category, priority, description ,status})
    .eq('id', id)
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data
}
