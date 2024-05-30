import React from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react'
import TimerProject from './TimerProject'
import TimerBar from './TimerBar'
import TimerBarSchedule from './TimerBarSchedule'
import TimerProjectSchedule from './TimerProjectSchedule'

export default function TimerTab() {
  const [selected, setSelected] = React.useState('photos')

  return (
    <div className='flex w-full mt-4  h-full  flex-col'>
      <Tabs
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key='photos' title='Timer'>
          <Card className='h-full'>
            <TimerBar />
             <TimerProject />
          </Card>
        </Tab>
        <Tab key='music' title='Schedule Timer'>
          <Card>
            <TimerBarSchedule />
            <TimerProjectSchedule />
          </Card>
        </Tab>
        {/* <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab> */}
      </Tabs>
    </div>
  )
}
