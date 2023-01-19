import './style.css';

export function StorageStatus() {
    const storageStatus = getLocalStorageStatus();
    let storageUsedClassName = 'storage-used';

    if (storageStatus.usePercentage >= 75) {
        storageUsedClassName += ' ' + ((storageStatus.usePercentage >= 90) ? 'danger' : 'warning');
    }

    return (
        <div className='storage-status'>
            <span>Storage use: <span>{storageStatus.status}</span></span>
            <div className='storage-total'>
                <div className={storageUsedClassName}
                        style={
                        {
                            width: storageStatus.usePercentage.toFixed(2) + '%',
                        }
                    }
                >
                </div>
            </div>
        </div>
    );

    function getLocalStorageStatus() {
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
        
        return {
            status: storageStatus,
            usePercentage: storageUsePercentage,
        };
    }
}