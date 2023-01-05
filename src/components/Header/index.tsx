import { useRecoilState } from 'recoil';
import { kanbanState } from '../../recoilState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import './style.css';

export function Header() {
    const kanbanData = useRecoilState(kanbanState);
    const blob = new Blob([JSON.stringify(kanbanData)], { type: 'text/json'});
    const jsonFile = URL.createObjectURL(blob);

    const total = 5120;
    let used = 0;
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const amount = ((localStorage[key].length * 16) / (8 * 1024));
            if (!isNaN(amount)) used += amount;
        }
    }
    const storageUsePercentage = (used * 100) / total;

    let storageStatus = '';
    if (used < 1024) {
        storageStatus = used.toFixed(2) + 'kb';
    }
    else {
        storageStatus = (used / 1024).toFixed(2) + 'Mb';
    }
    storageStatus += ' / ' + (total / 1024).toFixed(2) + 'Mb';
    
    let storageUsedClassName = 'storage-used';
    if (storageUsePercentage >= 75) {
        storageUsedClassName += ' ' + ((storageUsePercentage >= 90) ? 'danger' : 'warning');
    }

     return(
        <header className='header'>
            <div className='tab'>Kanban Tracker</div>
            <div className='extra'>
                <div className='import-export'>
                    <a href={jsonFile} download='kanban-tracker.json' title='Fazer download dos dados' className='action-button success'>
                        <FontAwesomeIcon icon={faFileArrowDown} />
                    </a>
                </div>
                <div className='storage-status'>
                    <span>Storage use: {storageStatus}</span>
                    <div className='storage-total'>
                        <div className={storageUsedClassName} style={{width: (storageUsePercentage.toFixed(2) + '%')}}></div>
                    </div>
                </div>
            </div>
        </header>
    );
}