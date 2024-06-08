import supabase from '../supabase'

export async function addTimer({
  duration,
  taskName,
  startTime,
  endTime,
  created_at,
  filter,user_id
}) {
  const { data, error } = await supabase
    .from('timer')
    .insert([{ user_id,duration, taskName, startTime, endTime, created_at ,filter}])
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data
}
export async function getTimer() {
  let { data, error } = await supabase.from('timer').select('*')
  if (error) {
    throw new Error(error.message)
  }
  return data
}
export async function deleteTimer(id) {
  const { error } = await supabase.from('timer').delete().eq('id', id)
  if (error) {
    throw new Error(error.message)
  }
}
export async function editTimer({id,taskName,duration}) {
  const { data, error } = await supabase
    .from('timer')
    .update({taskName,duration })
    .eq('id', id)
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data
}
