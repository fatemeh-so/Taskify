import { useState, useEffect } from 'react'
import { Button, Input, Avatar } from '@nextui-org/react'
import Spinner from './Spinner'
import useGetUser from '../features/auth/useGetUser'
import { useUpdateUser } from '../features/auth/useUpadateUser'
import uploadAvatar from '../services/uploadAvatar'
import { useTranslation } from 'react-i18next'

const MyProfile = () => {
  const {t,i18n}=useTranslation()
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
    if (!avatar) {
      editProf({
        username,
        password,
      })
    }
  }

  if (isUserLoading || isUpdating) return <Spinner />

  return (
    <>
      <div   className='lg:px-[7rem] px-4 h-full'>
        <h1 className='text-3xl  font-semibold mb-6'>{t("myProfile")}</h1>
        <div dir={i18n.language=="en"?"ltr":"rtl"} className='flex h-full flex-col md:flex-row gap-8 pr-8 pl-4'>
          <div className='flex-shrink-0 relative gap-4 bf'>
            <Avatar src={avatarUrl} className='w-20 h-20 text-large' />
          </div>
          <div   className='flex-grow lg:ml-[2rem]'>
            <Input
              label={t('username')}
              placeholder={t('enterYourUserName')}
              value={username}
              onChange={handleUsernameChange}
              className='mb-4'
            />
            <Input
              type='password'
              label={t('Password')}
              placeholder={t('enterYourPassword')}
              value={password}
              onChange={handlePasswordChange}
              className='mb-4'
            />
            <div className='flex gap-4'>
              <label
                htmlFor='avatarInput'
                className='w-[8rem] text-center md:left-[18rem] top-0  md:top-0 right-0 bg-primary hover:bg-primary-dark py-2 rounded-xl text-white cursor-pointer'
              >
                {t("chooseFile")}
              </label>
              <input
                id='avatarInput'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleAvatarChange}
              />
              <Button className='text-lg' onClick={handleSave} color='primary'>
                {t("saveChanges")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
