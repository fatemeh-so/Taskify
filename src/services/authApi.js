// authFunctions.js

import supabase from "../supabase"

export async function signUp({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    username,
    options: {
      data: {
        username
      },
    },
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
  // const { data: session } = await supabase.auth.getSession()
  // if (!session?.session) return null

  const { data, error } = await supabase.auth.getUser()
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

export async function editUser({ password, username, avatar }) {

// export async function editUser({ password, username, avatar }) {
  // Prepare the user metadata updates
  const updates = {
    user_metadata: {
      username,
      ...(avatar && { avatar: `https://ipujmkdynjpwmrbuoulr.supabase.co/storage/v1/object/public/avatars/${avatar}` }),
    },
  }

  // Update user metadata
  const { data: userData, error: userError } = await supabase.auth.updateUser({
    data: updates.user_metadata,
  })

  // Update password separately if provided
  let passwordError = null
  if (password) {
    const { error } = await supabase.auth.updateUser({ password })
    passwordError = error
  }

  return { data: userData, error: userError || passwordError }
}

