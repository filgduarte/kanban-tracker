import { KanbanData, Card } from './types';
import { nanoid } from 'nanoid';

export const LOCAL_STORAGE_DEFAULT_KEY = 'kanbanTracker';
export const LOCAL_STORAGE_ARCHIVE_KEY = 'kanbanArchive';
const LOCAL_STORAGE_DEFAULT_VALUE:KanbanData = {
    'columns': [
        {
            id: nanoid(),
            title: 'Tasks',
            color: 'color-1',
            icon: 'inbox',
            order: 1,
            archiveAfter: 0,
        }
    ],
    'cards': [],
}

export function getKanbanData(key?: string) {
    if ( !key ) key = LOCAL_STORAGE_DEFAULT_KEY;

    let kanbanData = localStorage.getItem(key);

    if (kanbanData) {
        return JSON.parse( kanbanData );
    }
    else {
        setKanbanData(LOCAL_STORAGE_DEFAULT_VALUE);
        return LOCAL_STORAGE_DEFAULT_VALUE;
    }
}

export function setKanbanData(value: KanbanData | Array<Card>, key?: string) {
    if ( !key ) key = LOCAL_STORAGE_DEFAULT_KEY;

    if ( value ) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch(error) {
            console.log('Houve um erro ao salvar os dados: ' + error);
        }
    }
}