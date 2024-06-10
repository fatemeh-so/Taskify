import { Button } from '@nextui-org/react'
import { ArrowLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <>
      <div onClick={() => navigate('/')} className='m-8'>
        {' '}
        <ArrowLeft size={20} />
      </div>
      <div className='h-[100vh] flex items-center justify-center p-8'>
        <div className='p-8 items-center flex '>
          <h1>The page you are looking for could not be found 😢</h1>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
