import { ArrowLeft } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

function HeaderTitle() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // تعیین ترجمه مناسب برای هر مسیر
  let path;
  if (pathname === '/dashboard') {
    path = t('dashboard');
  }
  if (pathname === '/schedule') {
    path = t('schedule'); // ترجمه برای 'schedule'
  }
  if (pathname === '/calender') {
    path = t('calender'); // ترجمه برای 'calender'
  }
  if (pathname === '/timer') {
    path = t('timer'); // ترجمه برای 'timer'
  }

  // شرایط خاص برای پروفایل
  if (pathname === '/profile') {
    return (
      <p onClick={() => navigate('/')} className='px-4 pt-2'>
        <ArrowLeft size={20} />
      </p>
    );
  }

  return (
    <>
      <h1 className='lg:text-[2rem] lg:pl-[7rem] pl-4 md:text-[2rem] text-[1rem] font-bold'>
        {path}
      </h1>
    </>
  );
}

export default HeaderTitle;
