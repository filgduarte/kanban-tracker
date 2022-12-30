import { atom } from 'recoil';
import { ModalProps } from './interfaces/Modal';
import { kanbanJSON } from './interfaces/kanbanJSON';
import { getKanbanData, setKanbanData } from './kanbanDataHandler';

export const kanbanState = atom({
    key: 'kanbanState',
    default: getKanbanData('kanbanTracker') as kanbanJSON
});

export const modalState = atom({
    key: 'modalState',
    default: {show: false, name: ''} as ModalProps
});