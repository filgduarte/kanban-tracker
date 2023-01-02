import { atom } from 'recoil';
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