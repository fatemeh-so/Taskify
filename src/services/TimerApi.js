import supabase from '../supabase'

export async function addTimer({
  duration,
  taskName,
  startTime,
  endTime,
  created_at,
}) {
  const { data, error } = await supabase
    .from('timer')
    .insert([{ duration, taskName, startTime, endTime, created_at }])
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
