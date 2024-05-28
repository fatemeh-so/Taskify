import supabase from '../supabase'

export async function addTimer({ duration, taskName, startTime, endTime }) {
  const { data, error } = await supabase
    .from('timer')
    .insert([{ duration, taskName, startTime, endTime }])
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
