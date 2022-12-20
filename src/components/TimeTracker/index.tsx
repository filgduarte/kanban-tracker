import { TimeTracker } from "../../interfaces/TimeTracker"
import './style.css';

export function TimeTracker(props: TimeTracker) {
    let secondsElapsed = props.seconds;

    const days = Math.floor(secondsElapsed / 86400);
    secondsElapsed -= days * 86400;

    const hours = Math.floor(secondsElapsed / 3600) % 24;
    secondsElapsed -= hours * 3600;

    const minutes = Math.floor(secondsElapsed / 60) % 60;
    secondsElapsed -= minutes * 60;

    const seconds = secondsElapsed % 60;

    return(
        <div className='time-tracker'>
            <span className="time-tracker__days">{days}</span>:
            <span className="time-tracker__hours">{hours}</span>:
            <span className="time-tracker__minutes">{minutes}</span>:
            <span className="time-tracker__seconds">{seconds}</span>
        </div>
    )
}