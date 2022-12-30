import { atom } from 'recoil';
import { ModalProps, kanbanData } from './types';
import { getKanbanData, setKanbanData } from './kanbanDataHandler';

export const kanbanState = atom({
    key: 'kanbanState',
    default: getKanbanData('kanbanTracker') as kanbanData
});

export const modalState = atom({
    key: 'modalState',
    default: {show: false, title: ''} as ModalProps
});