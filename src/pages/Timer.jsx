import TimerBar from "../features/timer/TimerBar"
import TimerProject from "../features/timer/TimerProject"
import TimerTab from "../features/timer/TimerTab"

function Timer() {
    return (
        <div className="w-[100%] h-auto  bg-white2  ">
                       <TimerTab/>
            {/* <TimerProject/> */}
        </div>
    )
}

export default Timer
