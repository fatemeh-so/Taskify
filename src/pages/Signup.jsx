import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useSignip from '../features/auth/useSignup'
import { useDispatch } from 'react-redux'
import { testadd } from '../features/schedule/taskSlice'

function SignUp() {
  const { register, getValues, formState, handleSubmit } = useForm()
  const { errors } = formState
  const { mutate: signup, isLoading } = useSignip()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSubmit({ fullName, email, password }) {
    signup({ username: fullName, email, password })
    dispatch(testadd(true))
  }

  function handleToLogin(e) {
    e.preventDefault()
    navigate('/login')
  }

  if (isLoading) return <Spinner />

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-50 p-4'>
      <div className='bg-white rounded-lg shadow-md p-8 w-full max-w-md'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Create an Account on Taskify
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Input
            type='text'
            label='Full Name'
            {...register('fullName', {
              required: 'Full name is required',
            })}
            className='max-w-full'
          />
          {errors.fullName && (
            <p className='text-xs text-red-500 mt-1'>{errors.fullName.message}</p>
          )}

          <Input
            type='email'
            label='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
            className='max-w-full'
          />
          {errors.email && (
            <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>
          )}

          <Input
            type='password'
            label='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            className='max-w-full'
          />
          {errors.password && (
            <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>
          )}

          <Input
            type='password'
            label='Repeat Password'
            {...register('passwordConfirm', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues().password || 'Passwords must match',
            })}
            className='max-w-full'
          />
          {errors.passwordConfirm && (
            <p className='text-xs text-red-500 mt-1'>{errors.passwordConfirm.message}</p>
          )}

          <Button
            type='submit'
            className='w-full bg-gradient-to-tr from-pink-500 to-pink-300 text-white shadow-lg'
          >
            Sign Up
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <button
              onClick={handleToLogin}
              className='text-pink-500 hover:text-pink-600 font-medium'
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
