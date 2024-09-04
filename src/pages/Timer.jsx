import TimerBar from "../features/timer/TimerBar"
import TimerProject from "../features/timer/TimerProject"
import TimerTab from "../features/timer/TimerTab"

function Timer() {
    return (
        <div className="w-[100%] h-[100vh] pl-[7rem] bg-gray">
                       <TimerTab/>
            {/* <TimerProject/> */}
        </div>
    )
}

export default Timer
