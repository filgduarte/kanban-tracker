import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { kanbanState } from '../../recoilState';
import { TimeTrackerProps } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faDownload, faInbox, faLayerGroup, faPause, faPlay, faTrashCan, faUserClock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './style.css';

library.add(
    faCheck,
    faInbox,
    faLayerGroup,
    faPause,
    faPlay,
    faTrashCan,
    faUserClock,
    faDownload,
    faPenToSquare
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
    const [trackers, setTrackers] = useState(props.trackers);
    const columns: Columns = {};

    kanban.columns.forEach(column => {
        columns[column.id] = {
            title: column.title,
            icon: column.icon,
            color: column.color
        }
    });

    // useEffect(() => {
    //     const counter = setInterval(() => {
    //         const newTrackers = {...props.trackers};

    //         Object.keys(trackers).forEach(key => {
    //             newTrackers[key] += Math.round(Date.now() - props.lastChanged);
    //         })

    //         setTrackers(newTrackers);
    //     }, 100);

    //     return () => {
    //         clearInterval(counter);
    //     }
    // },[]);

    function renderTracker(columnId: string) {
        const now = Date.now();
        let secondsElapsed = Math.round(now - props.lastChanged + trackers[columnId]) / 1000;

        const days = Math.floor(secondsElapsed / 86400);
        secondsElapsed -= days * 86400;
    
        const hours = Math.floor(secondsElapsed / 3600) % 24;
        secondsElapsed -= hours * 3600;
    
        const minutes = Math.floor(secondsElapsed / 60) % 60;
        secondsElapsed -= minutes * 60;
    
        const seconds = Math.round(secondsElapsed % 60);

        return(
            <div key={columnId} className={`time-tracker ${columns[columnId].color}`}>
                <div className='time-tracker__title'>
                    <h2>
                        <span className='icon'><FontAwesomeIcon icon={columns[columnId].icon} /></span>
                        {columns[columnId].title}
                    </h2>
                </div>
                <div className='time-tracker__counter'>
                    <span className="time-tracker__days">{String(days).padStart(2, '0')}</span>:
                    <span className="time-tracker__hours">{String(hours).padStart(2, '0')}</span>:
                    <span className="time-tracker__minutes">{String(minutes).padStart(2, '0')}</span>:
                    <span className="time-tracker__seconds">{String(seconds).padStart(2, '0')}</span>
                </div>
            </div>
        )
    }

    function renderGraph() {
        
    }

    return(
        <div className='time-tracker'>
            { Object.keys(props.trackers).map(key => renderTracker(key)) }
        </div>
    )
}