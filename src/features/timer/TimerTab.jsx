import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import TimerProject from './TimerProject'
import TimerBar from './TimerBar'
import TimerBarSchedule from './TimerBarSchedule'
import { useTranslation } from 'react-i18next'
import TimerProjectSchedule from './TimerProjectSchedule'
export default function TimerTab() {
  const { t } = useTranslation()
  const [selected, setSelected] = React.useState('photos')

  return (
    <div className='flex w-full flex-col gap-6'>
      <Tabs
        aria-label='Timer Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
        color='primary'
        variant='underlined'
        classNames={{
          tabList:
            'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-primary',
          tab: 'max-w-fit px-0 h-12 text-lg',
          tabContent: 'group-data-[selected=true]:text-primary font-medium',
        }}
      >
        <Tab key='photos' title={t('timer')}>
          <div className='flex flex-col gap-6 pt-4'>
            <TimerBar />
            <TimerProject />
          </div>
        </Tab>
        <Tab key='music' title={t('taskTimer')}>
          <div className='flex flex-col gap-6 pt-4'>
            <TimerBarSchedule />
            <TimerProjectSchedule />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
