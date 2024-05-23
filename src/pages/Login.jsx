import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
// import BottomHeader from '../components/BottomHeader'
import { useNavigate } from 'react-router-dom'
// import { useLogin } from '../features/auth/useLogin'
// import Spinner from '../components/Spinner'
// import BottomHeader from '../components/BottomHeader'
function Login() {
  const navigate = useNavigate()
  const { register, getValues, formState, handleSubmit, reset } = useForm()
  //   const { mutate: loginTo, isLoading } = useLogin()
  const { errors } = formState

  function onSubmit({ email, password }) {
    // loginTo({ email, password })
  }
  function handelToLogin(e) {
    e.preventDefault()
    navigate('/signup')
  }
  //   if (isLoading) return <Spinner />
  return (
    <div className='flex h-[100vh] flex-col justify-center items-center it w[100vh]'>
      {/* <BottomHeader  /> */}
      {/* <BottomHeader icon='user' to='home' /> */}
      <form
        className='flex h-[100%]  w-[100%]  justify-center  items-center mt-[-1rem] '
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='  w-[100%] roundedl-[3rem] rounded-[2rem]  flex flex-col justify-center items-center h-[55vh] '>
          <h1 className='text-[1.8rem] my-[1rem] '>Login</h1>

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
              // placeholder='Fullname'
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
              // placeholder='Fullname'
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
          <button
            onClick={handelToLogin}
            className='text-default-500 text-small  text-blue-200'
          >
            create account
          </button>
          <Button
            className='text-white1 font-semibold  bg-blue1 mt-[1rem] '
            type='submit'
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
