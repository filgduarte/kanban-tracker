import './style.css';

export function Header() {
    const total = 5120;
    let used = 0;
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const amount = ((localStorage[key].length * 16) / (8 * 1024));
            if (!isNaN(amount)) used += amount;
        }
    }
    const storageUsePercentage = (used * 100) / total;
    const storageUsedWidth = storageUsePercentage.toFixed(2) + '%';

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
            <div className='storage-status'>
                <span>Storage use: {`${used.toFixed(2)}KB / ${total/1024}Mb`}</span>
                <div className='storage-total'>
                    <div className={storageUsedClassName} style={{width: storageUsedWidth}}></div>
                </div>
            </div>
        </header>
    )
}