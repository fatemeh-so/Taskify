import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
// import useSignup from '../features/auth/useSignup'
import Spinner from "../components/Spinner"
import useSignip from '../features/auth/useSignup'
function SignUp() {
  const { register, getValues, formState, handleSubmit, reset } = useForm()
  const { errors } = formState
  const {mutate:signup,isLoading}=useSignip()
  //   const { isLoading, mutate: signUp } = useSignUp()
  const navigate = useNavigate()

  function onSubmit({ fullName,email, password }) {
    console.log(fullName, email, password)
    signup( {username:fullName, email, password })
    // signUp({ fullName, email, password })
  }

  function handleToLogin(e) {
    e.preventDefault();
    navigate('/login');
  }
  
    if (isLoading) return <Spinner />
  return (
    <div className='h-[100vh] flex flex-col justify-center it w[100vh]'>
      {/* <BottomHeader  /> */}
      {/* <BottomHeader leftContent={false} to='home' /> */}
      <form
        className='flex h-[100%]  w-[100%]  justify-center  items-center mt-[-1rem] '
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='  w-[100%] roundedl-[3rem] rounded-[2rem]  flex flex-col justify-center items-center h-[55vh] bg-gay-700/90'>
          <h1 className='text-[1.8rem] my-[1rem] '>Sign Up</h1>

          {/* full name */}
          <div className=' w-full flex flex-col gap-2 max-w-[240px]'>
            <Input
              classNames={{
                mainWrapper: 'h-full ',
                input: 'text-small ',
                inputWrapper:
                  'h-full  font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
              }}
              label='Full Name'
              id='fullName'
              {...register('fullName', { required: 'this field is required' })}
            />
            <p className='text-default-500 text-small ml-[1rem] text-red-600'>
              {errors?.fullName?.message}
            </p>
          </div>
          {/* email */}
          <div className='w-full flex flex-col gap-2 max-w-[240px]'>
            <Input
              classNames={{
                mainWrapper: 'h-full ',
                input: 'text-small ',
                inputWrapper:
                  'h-full  font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
              }}
              label=' Email'
              // placeholder='FullName'
              id='email'
              {...register('email', {
                required: 'this field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
            <p className='text-default-500 text-small ml-[1rem] text-red-600'>
              {errors?.email?.message}
            </p>
            {/* pass */}
          </div>
          <div className='w-full flex flex-col gap-2 max-w-[240px]'>
            <Input
              classNames={{
                mainWrapper: 'h-full ',
                input: 'text-small ',
                inputWrapper:
                  'h-full  font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
              }}
              type='password'
              label=' Password'
              // placeholder='FullName'
              id='password'
              {...register('password', {
                required: 'this field is required',
                minLength: {
                  value: 8,
                  message: 'Password needs a minimum of 8 characters',
                },
              })}
            />
            <p className='text-default-500 text-small ml-[1rem] text-red-600'>
              {errors?.password?.message}
            </p>
          </div>
          {/* re pass */}
          <div className='w-full flex flex-col gap-2 max-w-[240px]'>
            <Input
              classNames={{
                mainWrapper: 'h-full ',
                input: 'text-small ',
                inputWrapper:
                  'h-full  font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
              }}
              type='password'
              label=' Repeat Password'
              // placeholder='FullName'
              id='passwordConfirm'
              {...register('passwordConfirm', {
                required: 'this field is required',
                validate: (value) =>
                  value === getValues().password || 'Passwords need to match',
              })}
            />
            <p className='text-default-500 text-small ml-[1rem] text-red-600'>
              {errors?.passwordConfirm?.message}
            </p>
          </div>
          <button
            onClick={handleToLogin}
            className='text-default-500 text-small  text-blue-300'
          >
            Have an account?
          </button>
          <Button disabled={isLoading} className='text-white1 bg-blue1 mt-[1rem] font-semibold ' type='submit'>
            submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
