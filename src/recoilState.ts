import { atom } from 'recoil';
import { ModalProps } from './types';
import { kanbanData } from './types';
import { getKanbanData } from './utils';

export const kanbanState = atom({
    key: 'kanbanState',
    default: getKanbanData('kanbanTracker') as kanbanData
});

export const modalState = atom({
    key: 'modalState',
    default: {show: false, title: ''} as ModalProps
});