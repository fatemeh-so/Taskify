import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import useSignup from '../features/auth/useSignup';
import Spinner from '../components/Spinner';
import useSignin from '../features/auth/useSignin';
// import useSignin from '../features/auth/useSignup';

function Login() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const {mutate:signip,isLoading}=useSignin()

  function onSubmit({  email, password }) {
    signip({  email, password })
  }

  function handleToSignup(e) {
    e.preventDefault();
    navigate('/signup');
  }
  if (isLoading) return <Spinner />

  return (
    <div className='flex h-[100vh] flex-col justify-center items-center '>
      <form
        className='flex h-[100%] w-[100%] justify-center items-center mt-[-1rem]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-[100%] rounded-l-[3rem] rounded-[2rem] flex flex-col justify-center items-center h-[55vh]'>
          <h1 className='text-[1.8rem] my-[1rem]'>Login</h1>

          {/* Email */}
          <div className='w-full flex flex-col gap-2 max-w-[240px]'>
            <Input
              classNames={{
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper: 'h-full font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
              }}
              label='Email'
              id='email'
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
            <p className='text-default-500 text-small ml-[1rem] text-red-600'>
              {errors.email && errors.email.message}
            </p>
          </div>

          {/* Password */}
          <div className='w-full flex flex-col gap-2 max-w-[240px]'>
            <Input
              classNames={{
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper: 'h-full font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
              }}
              type='password'
              label='Password'
              id='password'
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password needs a minimum of 8 characters',
                },
              })}
            />
            <p className='text-default-500 text-small ml-[1rem] text-red-600'>
              {errors.password && errors.password.message}
            </p>
          </div>

          {/* Navigation to Signup */}
          <button
            onClick={handleToSignup}
            className='text-default-500 text-small text-blue-200'
          >
            Create account
          </button>

          {/* Submit Button */}
          <Button
            className='text-white font-semibold bg-blue-500 mt-[1rem]'
            type='submit'
            disabled={isLoading}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
