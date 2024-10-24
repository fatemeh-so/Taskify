import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import TimerProject from './TimerProject'
import TimerBar from './TimerBar'
import TimerBarSchedule from './TimerBarSchedule'
import { useTranslation } from 'react-i18next'
import TimerProjectSchedule from "./TimerProjectSchedule"
export default function TimerTab() {
  const { t } = useTranslation()
  const [selected, setSelected] = React.useState('photos')

  return (
    <div className='flex w-full mt-4 lg:h-full md:h-[120vh] flex-col'>
      <Tabs
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key='music' title={t('taskTimer')}>
          <div className='pr-4'>
            <TimerBarSchedule />
            <TimerProjectSchedule />
          </div>
        </Tab>
        <Tab key='photos' title={t('timer')}>
          <div className='pr-4'>
            <TimerBar />
            <TimerProject />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
