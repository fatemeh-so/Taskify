import TimerBar from "../features/timer/TimerBar"
import TimerProject from "../features/timer/TimerProject"

function Timer() {
    return (
        <div className="w-[100%]  overflow-x-hidden">
            <TimerBar/>
            <TimerProject/>
        </div>
    )
}

export default Timer
