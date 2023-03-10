import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from '../../recoilState';
import { setKanbanData } from '../../kanbanDataHandler';
import { KanbanData, Column } from '../../types';
import { StorageStatus } from '../StorageStatus';
import { KanbanFilter } from '../KanbanFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import './style.css';

export function Header() {
    const [kanban, setKanban] = useRecoilState(kanbanState);
    const setModal = useSetRecoilState(modalState);

    return(
        <header className='header'>
            <KanbanFilter filters={{
                Ativos: 'Show Active',
                Arquivo: 'Show Archived',
            }}/>
            <div className='extra'>
                <StorageStatus />
                <nav className='main-nav'>
                    <ul className='menu'>
                        <li className='menu__item'>
                            <a href='#'
                               title='Sobre o Kanban Tracker'
                               onClick={e => openInfoModal(e)}
                            >
                                <FontAwesomeIcon icon={faInfo} />
                            </a>
                        </li>
                        <li className='menu__item'>
                            <a href='#'
                               title='Mais opções'
                               onClick={
                                    e => {
                                        e.preventDefault();
                                        e.currentTarget.classList.toggle('open-submenu');
                                    }
                                }
                            >
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </a>
                            <ul className='submenu'>
                                <li className='submenu__item'>
                                    <a href='#'
                                       title='Exportar dados'
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
                                    <label htmlFor='import' title='Importar dados'>
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

    function openInfoModal(event: React.MouseEvent<HTMLAnchorElement>) {
        setModal({
            show: true,
            title: 'Sobre o Kanban Tracker',
            children: <p>Este projeto foi criado por <a href='https://filduarte.com.br' target='_blank'>Filipe Duarte</a> para organização pessoal de projetos.</p>,
        })
    }   
}