// authFunctions.js
import supabase from '../supabase'

export async function signUp({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    username,
  })
  if (error) {
    console.error(error)
    throw new Error('email or password was wrong')
  }

  return { data }
}

export async function signIn({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.error(error)
    throw new Error('there is an error in get login')
  }
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    throw new Error('logout wrong')
  }
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session?.session) return null

  const { data, error } = await supabase.auth.getUser()
  //   console.log(user.role);
  if (error) {
    console.error(error)
    throw new Error('user wrong')
  }
  return data?.user
}
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
