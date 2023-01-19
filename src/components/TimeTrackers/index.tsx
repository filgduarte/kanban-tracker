import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { kanbanState } from '../../recoilState';
import { TimeTrackerProps } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faDownload, faInbox, faLayerGroup, faPause, faPlay, faTrashCan, faUserClock } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(
    faCheck,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faTrashCan,
    faUserClock,
    faDownload
);

export function TimeTrackers(props: TimeTrackerProps) {
    interface ColumnData {
        title: string;
        icon: IconProp;
        color: string;
    }

    interface Columns {
        [id: string]: ColumnData;
    }
    
    const now = Date.now();
    const kanban = useRecoilValue(kanbanState);
    const [trackers, setTrackers] = useState(props.card.timeTracker);
    const [totalTime, setTotalTime] = useState((now - props.card.creationDate) / 1000);
    const formatedTotalTime = formatTime(totalTime);
    const columns: Columns = {};
    const timeTrackersInfo: Array<React.ReactNode> = []
    const timeTrackersBars: Array<React.ReactNode> = []

    kanban.columns.forEach(column => {
        columns[column.id] = {
            title: column.title,
            icon: column.icon,
            color: column.color
        }
    });

    useEffect(() => {
        const counter = setInterval(() => {
            // JUST TO RE-RENDER THE TIMERS EVERY SECOND
            setTrackers({...props.card.timeTracker});
            setTotalTime((Date.now() - props.card.creationDate) / 1000);
        }, 1000);

        return () => {
            clearInterval(counter);
        }
    },[]);

    Object.keys(props.card.timeTracker).forEach((columnId) => {
        const secondsElapsed = getSecondsElapsed(columnId);
        timeTrackersInfo.push(renderTracker(columnId, secondsElapsed));
        timeTrackersBars.push(renderChartBar(columnId, secondsElapsed));
    });

    return(
        <div className='time-trackers'>
            <div className='time-tracker__columns'>
            { timeTrackersInfo }
            </div>
            <div className='time-tracker__chart'>
                <div className='time-tracker__chart-data'>
                    { timeTrackersBars }
                </div>
                <div className='time-tracker__chart-label'>
                    <h4>Tempo total:</h4>
                    <div className='time-tracker__counter'>
                        <span className='time-tracker__days'>{formatedTotalTime.days}</span>:
                        <span className='time-tracker__hours'>{formatedTotalTime.hours}</span>:
                        <span className='time-tracker__minutes'>{formatedTotalTime.minutes}</span>:
                        <span className='time-tracker__seconds'>{formatedTotalTime.seconds}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderTracker(columnId: string, secondsElapsed: number) {
        const formatedTime = formatTime(secondsElapsed);

        return(
            <div key={columnId} className={`time-tracker ${columns[columnId].color}`}>
                <div className='time-tracker__title'>
                    <h2>
                        <span className='icon'><FontAwesomeIcon icon={columns[columnId].icon} /></span>
                        {columns[columnId].title}
                    </h2>
                </div>
                <div className='time-tracker__counter'>
                    <span className='time-tracker__days'>{formatedTime.days}</span>:
                    <span className='time-tracker__hours'>{formatedTime.hours}</span>:
                    <span className='time-tracker__minutes'>{formatedTime.minutes}</span>:
                    <span className='time-tracker__seconds'>{formatedTime.seconds}</span>
                </div>
            </div>
        )
    }

    function renderChartBar(columnId: string, secondsElapsed: number) {
        const percentage = Math.round( ( (secondsElapsed * 100) / totalTime ) * 1000 ) / 1000
        return (
            <div className={`bar-chart__bar ${columns[columnId].color}`}
                 style={{
                    width: `${percentage}%`,
                 }}
                 key={columnId}
            >
            </div>
        );
    }

    function formatTime(secondsElapsed: number) {
        const days = Math.floor(secondsElapsed / 86400);
        secondsElapsed -= days * 86400;
    
        const hours = Math.floor(secondsElapsed / 3600) % 24;
        secondsElapsed -= hours * 3600;
    
        const minutes = Math.floor(secondsElapsed / 60) % 60;
        secondsElapsed -= minutes * 60;
    
        const seconds = Math.round(secondsElapsed % 60);

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        }
    }

    function getSecondsElapsed(columnId: string) {
        let secondsElapsed = trackers[columnId];

        if (columnId == props.card.columnId) {
            secondsElapsed += Math.round(Math.abs(now - props.card.lastChange)) / 1000;
        }

        return secondsElapsed;
    }
}