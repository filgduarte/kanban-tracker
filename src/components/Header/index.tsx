import { useRecoilState } from 'recoil';
import { kanbanState } from '../../recoilState';
import { setKanbanData } from '../../kanbanDataHandler';
import { KanbanData, Column } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faInfo, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import './style.css';

export function Header() {
    const [kanban, setKanban] = useRecoilState(kanbanState);
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
                <div className='storage-status'>
                    <span>Storage use: {storageStatus}</span>
                    <div className='storage-total'>
                        <div className={storageUsedClassName}
                             style={
                                {
                                    width: storageUsePercentage.toFixed(2) + '%',
                                }
                            }
                        >
                        </div>
                    </div>
                </div>
                <nav className='main-nav'>
                    <ul className='menu'>
                        <li className='menu__item'>
                            <a href='#' title='Sobre o Kanban Tracker'>
                                <FontAwesomeIcon icon={faInfo} />
                            </a>
                        </li>
                        <li className='menu__item'>
                            <a href='#' title='Ajuda'>
                                <FontAwesomeIcon icon={faQuestion} />
                            </a>
                        </li>
                        <li className='menu__item'>
                            <a href='#'
                               onClick={
                                    e => {
                                        e.preventDefault();
                                        e.currentTarget.classList.toggle('open-submenu');
                                    }
                                }
                               title='Mais opções'
                            >
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </a>
                            <ul className='submenu'>
                                <li className='submenu__item'>
                                    <a href='#'
                                       onClick={
                                            e => {
                                                e.preventDefault();
                                                downloadFile(
                                                    JSON.stringify(kanban),
                                                    'kanban-tracker.json',
                                                    'text/json'
                                                );
                                            }
                                        }
                                    >
                                        Exportar dados
                                    </a>
                                </li>
                                <li className='submenu__item'>
                                    <label htmlFor='import'>
                                    <input type='file'
                                           accept='.json'
                                           onChange={
                                            e => {
                                                importFile(e, e.currentTarget.files);
                                            }
                                           }
                                           id='import'
                                           className='hidden-input'
                                    />
                                        Importar dados
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );

    function downloadFile(data: string, fileName: string, fileType: string) {
        const blob = new Blob([data], { type: fileType});
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;

        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvent);
        a.remove();
    }

    function importFile(event: React.ChangeEvent<HTMLInputElement>, file: FileList | null) {
        if (!file) {
            alert('Nenhum arquivo selecionado.');
            return
        }

        const reader = new FileReader();
        reader.readAsText(file[0]);

        reader.onload = function() {
            const importedJson: string = JSON.parse( JSON.stringify(reader.result) );
            const parseJson = parseKanbanData(importedJson);

            if (parseJson.status == 'success') {
                if (confirm('O processo de importação irá apagar o kanboard atual e substituir pelos dados importados. Esse processo é irreversível.\nTem certeza de que quer prosseguir?')) {
                    setKanban(parseJson.newKanban);
                    setKanbanData(parseJson.newKanban);
                }
            }
            else {
                const errorsList = [];
                if (parseJson.errors.hasNoColumns) {
                    errorsList.push('• O arquivo não contém nenhuma informação de colunas.');
                }
                if (parseJson.errors.columnsWithErrors > 0) {
                    errorsList.push(`• ${parseJson.errors.columnsWithErrors} colunas estão com dados incompatíveis`);
                }
                if (parseJson.errors.cardsWithErrors > 0) {
                    errorsList.push(`• ${parseJson.errors.cardsWithErrors} cards estão com dados incompatíveis`);
                }

                alert(
                    `Não foi possível realizar a importação, pois o arquivo contém erros:
                    ${errorsList.join("\n")}`
                )
            }
        }

        event.currentTarget.value = '';
    }

    function parseKanbanData(jsonData: string) {
        const data: KanbanData = JSON.parse(jsonData);

        const newKanban: KanbanData = {
            columns: [],
            cards: [],
        }

        const errors = {
            hasNoColumns: false,
            columnsWithErrors: 0,
            cardsWithErrors: 0,
        };
        
        if (data.columns) {
            Object.values(data.columns).forEach(column => {
                if (
                    (typeof(column.id) == 'string') &&
                    (typeof(column.title) == 'string') &&
                    (typeof(column.color) == 'string') &&
                    (typeof(column.icon) == 'string') &&
                    (typeof(column.order) == 'number')
                ) {
                    const newColumn: Column = {
                        id: column.id,
                        title: column.title,
                        color: column.color,
                        icon: column.icon,
                        order: column.order,
                        archiveAfter: 0,
                    }

                    if (typeof(column.archiveAfter) == 'number') {
                        newColumn.archiveAfter = column.archiveAfter;
                    }
                                        
                    newKanban.columns.push(newColumn);
                }
                else {
                    errors.columnsWithErrors = errors.columnsWithErrors + 1;
                }
            })
        } else {
            errors.hasNoColumns = true;
        }

        if (data.cards) {
            Object.values(data.cards).forEach(card => {
                if (
                    (typeof(card.id) == 'string') &&
                    (typeof(card.title) == 'string') &&
                    (typeof(card.description) == 'string') &&
                    (typeof(card.order) == 'number') &&
                    (typeof(card.columnId) == 'string') &&
                    (typeof(card.creationDate) == 'number') &&
                    (typeof(card.timeTracker) == 'object') &&
                    (typeof(card.lastChange) == 'number')
                ) {
                    let checkTrackers = 0;
                    Object.values(card.timeTracker).forEach(tracker => {
                        if (typeof(tracker) == 'number') {
                            checkTrackers = checkTrackers + 1;
                        }
                    });

                    if (card.timeTracker.length == checkTrackers) {
                        errors.cardsWithErrors = errors.cardsWithErrors + 1;
                    }
                    else {
                        newKanban.cards.push({
                            id: card.id,
                            title: card.title,
                            description: card.description,
                            order: card.order,
                            columnId: card.columnId,
                            creationDate: card.creationDate,
                            timeTracker: card.timeTracker,
                            lastChange: card.lastChange,
                        });
                    }
                }
            });
        }

        const returnObject = {
            status: (
                        errors.hasNoColumns ||
                        (errors.columnsWithErrors > 0) ||
                        (errors.cardsWithErrors > 0)
                    ) ? 'error' : 'success',
            errors: errors,
            newKanban: newKanban,
        }

        return returnObject;
    }
}