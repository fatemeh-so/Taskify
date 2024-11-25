import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useSignin from '../features/auth/useSignin'

function Login() {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const { mutate: signin, isLoading } = useSignin()

  function onSubmit({ email, password }) {
    signin({ email, password })
  }

  function handleToSignup(e) {
    e.preventDefault()
    navigate('/signup')
  }

  if (isLoading) return <Spinner />

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-50 p-4'>
      <div className='bg-white rounded-2xl  p-8 w-full max-w-sm'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Welcome to Taskify
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Input
            type='email'
            label='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email',
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
            <p className='text-xs text-red-500 mt-1'>
              {errors.password.message}
            </p>
          )}


          <Button
            type='submit'
            // radius='full'
            className='w-full bg-gradient-to-tr from-pink-500 to-pink-300 text-white shadow-lg'
          >
            Login
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            New to Taskify?{' '}
            <button
              onClick={handleToSignup}
              className='text-pink-500 hover:text-pink-600 font-medium'
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
