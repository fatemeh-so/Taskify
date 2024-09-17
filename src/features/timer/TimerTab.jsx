import React from 'react'
import {Tabs, Tab} from '@nextui-org/react'
import TimerProject from './TimerProject'
import TimerBar from './TimerBar'
import TimerBarSchedule from './TimerBarSchedule'
import TimerProjectSchedule from './TimerProjectSchedule'

export default function TimerTab() {
  const [selected, setSelected] = React.useState('photos')

  return (
    <div className='flex w-full mt-4 lg:h-full md:h-[120vh] flex-col'>
      <Tabs
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key='music' title='Task Timer'>
          {/* <Card> */}
            <TimerBarSchedule />
            <TimerProjectSchedule />
          {/* </Card> */}
        </Tab>
        <Tab key='photos' title='Timer'>
          {/* <Card className='h-full bg-black'> */}
            <TimerBar />
             <TimerProject />
          {/* </Card> */}
        </Tab>
      </Tabs>
    </div>
  )
}
