import { useState, useEffect } from 'react'
import { Button, Input, Avatar } from '@nextui-org/react'
import Spinner from './Spinner'
// import  useUpdateUser  from '../features/auth/useUpdateUser';
import useGetUser from '../features/auth/useGetUser'
import { useUpdateUser } from '../features/auth/useUpadateUser'
import uploadAvatar from '../services/uploadAvatar'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const { mutate: editProf, isLoading: isUpdating } = useUpdateUser()
  
  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || '')
      setAvatarUrl(user.user_metadata?.avatar || '')
    }
  }, [user])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result)
        setAvatar(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    let avatarUrlToSave = avatarUrl

    if (avatar) {
      // console.log(avatar)
      // Replace this with your own function to upload the avatar and get the URL
      avatarUrlToSave = await uploadAvatar(avatar)
      editProf({
        username,
        password,
        avatar: avatarUrlToSave,
      })
    }
    if (!avatar){
      editProf({
        username,
        password,
      })}
  }

  if (isUserLoading || isUpdating) return <Spinner />

  return (
    <>
    <div className='pl-[7rem] py-'>
      <h1 className='text-3xl  font-semibold mb-6'>My Profile</h1>
      <div className='flex flex-col md:flex-row gap-8 pr-8 pl-4'>
        <div className='flex-shrink-0 relative gap-4'>
          <Avatar src={avatarUrl} className='w-20 h-20 text-large' />
          <label
            htmlFor='avatarInput'
            className='absolute md:w-[8rem] text-center  md:left-[18rem]  bottom-0 right-0 bg-primary hover:bg-primary-dark py-2 rounded-xl text-white cursor-pointer'
          >
            Choose File
          </label>
          <input
            id='avatarInput'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleAvatarChange}
          />
        </div>
        <div className='flex-grow lg:ml-[2rem]'>
          <Input
            label='Username'
            placeholder='Enter your username'
            value={username}
            onChange={handleUsernameChange}
            className='mb-4'
          />
          <Input
            type='password'
            label='Password'
            placeholder='Enter your password'
            value={password}
            onChange={handlePasswordChange}
            className='mb-4'
          />
          <Button className='text-lg' onClick={handleSave} color='primary'>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
 </> )
}

export default MyProfile
