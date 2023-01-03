import { useState, useEffect, useRef } from 'react';
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

    const kanban = useRecoilValue(kanbanState);
    const now = Date.now();
    const [trackers, setTrackers] = useState(props.card.timeTracker);
    const [totalTime, setTotalTime] = useState((now - props.card.creationDate) / 1000);
    const [chartWidth, setChartWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const columns: Columns = {};

    kanban.columns.forEach(column => {
        columns[column.id] = {
            title: column.title,
            icon: column.icon,
            color: column.color
        }
    });

    useEffect(() => {
        if (ref.current) {
            setChartWidth(ref.current.offsetWidth);
        }

        const counter = setInterval(() => {
            // JUST TO RE-RENDER THE TIMERS EVERY SECOND
            setTrackers({...props.card.timeTracker});
            setTotalTime((Date.now() - props.card.creationDate) / 1000);
        }, 1000);

        return () => {
            clearInterval(counter);
        }
    },[]);

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

    function renderTracker(columnId: string) {
        let secondsElapsed = trackers[columnId];

        if (columnId == props.card.columnId) {
            secondsElapsed += Math.abs(now - props.card.lastChange) / 1000;
        }

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
                    <span className="time-tracker__days">{formatedTime.days}</span>:
                    <span className="time-tracker__hours">{formatedTime.hours}</span>:
                    <span className="time-tracker__minutes">{formatedTime.minutes}</span>:
                    <span className="time-tracker__seconds">{formatedTime.seconds}</span>
                </div>
            </div>
        )
    }

    function renderChart() {
        const formatedTime = formatTime(totalTime);
        const timeTrackers = Object.entries(props.card.timeTracker);
        let cssGradient = `radial-gradient(var(--color-background) 50%, transparent 51%),
                           conic-gradient(`;

        timeTrackers.forEach(([columnId, seconds], index) => {
            const percentage = Math.round((seconds * 100) / totalTime);
            let prevPercentage = 0;
            if (index > 0) {
                prevPercentage =  Math.round((timeTrackers[index - 1][1] * 100) / totalTime);
            }

            cssGradient += `var(--${columns[columnId].color}) ${prevPercentage + 0.1}% ${percentage}%`;
            
            if (index < (timeTrackers.length - 1)) {
                cssGradient += ', ';
            }
        });

        cssGradient += ')';

        return (
            <div className='donut-chart' ref={ref} style={{backgroundImage: cssGradient, minHeight: chartWidth}}>
                <h4>Tempo total:</h4>
                <div className='time-tracker__counter'>
                    <span className="time-tracker__days">{formatedTime.days}</span>:
                    <span className="time-tracker__hours">{formatedTime.hours}</span>:
                    <span className="time-tracker__minutes">{formatedTime.minutes}</span>:
                    <span className="time-tracker__seconds">{formatedTime.seconds}</span>
                </div>
            </div>
        );
    }

    return(
        <div className='time-tracker'>
            <div className='time-tracker__columns'>
            { Object.keys(props.card.timeTracker).map(key => renderTracker(key)) }
            </div>
            <div className='time-tracker__chart'>
                {renderChart()}
            </div>
        </div>
    )
}