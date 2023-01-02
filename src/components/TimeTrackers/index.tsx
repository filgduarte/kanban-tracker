import { useState } from 'react';
import { useRecoilState } from 'recoil';
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
    function renderTracker(
        columnTitle: string,
        columnIcon: IconProp,
        columnColor: string,
        totalTime: number,
        lastChange: number
    ) {
        let secondsElapsed = totalTime;

        const days = Math.floor(secondsElapsed / 86400);
        secondsElapsed -= days * 86400;
    
        const hours = Math.floor(secondsElapsed / 3600) % 24;
        secondsElapsed -= hours * 3600;
    
        const minutes = Math.floor(secondsElapsed / 60) % 60;
        secondsElapsed -= minutes * 60;
    
        const seconds = secondsElapsed % 60;

        return(
            <div className='time-tracker'>
                <div className='time-tracker__title'>
                    <h2>
                        <span className='icon'><FontAwesomeIcon icon={columnIcon} /></span>
                        {columnTitle}
                    </h2>
                </div>
                <div className='time-tracker__counter'>

                </div>
            </div>
        )
    }
    return(
        <div className='time-tracker'>
            <span className="time-tracker__days">{days}</span>:
            <span className="time-tracker__hours">{hours}</span>:
            <span className="time-tracker__minutes">{minutes}</span>:
            <span className="time-tracker__seconds">{seconds}</span>
        </div>
    )
}