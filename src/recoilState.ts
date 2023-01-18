import { atom, selector } from 'recoil';
import { ModalProps, KanbanData } from './types';
import { getKanbanData } from './kanbanDataHandler';

export const kanbanState = atom({
    key: 'kanbanState',
    default: getKanbanData() as KanbanData
});

export const modalState = atom({
    key: 'modalState',
    default: {show: false, title: ''} as ModalProps
});

export const kanbanFilterState = atom({
    key: 'kanbanFilter',
    default: 'Show Active',
});

export const filteredKanbanState = selector({
    key: 'filteredKanban',
    get: ({get}) => {
        const filter = get(kanbanFilterState);
        const kanban = get(kanbanState);

        switch (filter) {
            case 'Show Archived':
                return {
                    columns: kanban.columns.filter((item) => item.archiveAfter > 0),
                    cards: kanban.cards.filter((item) => {
                        const myColumn = kanban.columns.findIndex(column => column.id == item.columnId);
                        const archiveAfter = kanban.columns[myColumn].archiveAfter;
                        const shouldNotArchive = archiveAfter == 0;

                        if (shouldNotArchive)
                            return false;
                        
                        const isInnactive = Date.now() - item.lastChange >= archiveAfter;
                        return isInnactive;
                    }),
                };
            
            case 'Show Active':
                return {
                    columns: kanban.columns,
                    cards: kanban.cards.filter((item) => {
                        const myColumn = kanban.columns.findIndex(column => column.id == item.columnId);
                        const archiveAfter = kanban.columns[myColumn].archiveAfter;
                        const shouldNotArchive = archiveAfter == 0;

                        if (shouldNotArchive)
                            return true;

                        const isActive = Date.now() - item.lastChange < archiveAfter;
                        return isActive;
                    }),
                };

            default:
                return kanban;
        }
    },
});