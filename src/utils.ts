import { nanoid } from "nanoid";
import { useSetRecoilState } from 'recoil';
import { kanbanState, modalState } from './recoilState';
import { kanbanData } from "./types";

const kanbanDefault:kanbanData = {
    'columns': [
        {
            'id': nanoid(),
            'title': 'Tasks',
            'color': 'color-1',
            'icon': 'inbox',
            'order': 1,
        }
    ],
    'cards': [],
}

export function getKanbanData(key: string) {
    let kanbanData = localStorage.getItem(key);

    if (kanbanData) {
        return JSON.parse( kanbanData );
    }
    else {
        setKanbanData(key, kanbanDefault);
        return kanbanDefault;
    }
}

export function setKanbanData(key: string, value: kanbanData) {
    if (key) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const setKanban = useSetRecoilState(kanbanState);
export function saveAndCloseModal(newKanban: kanbanData) {
    setKanban(newKanban);
    setKanbanData('kanbanTracker', newKanban);
    setModal({
        show: false,
        title: '',
    })
}

const setModal = useSetRecoilState(modalState);
export function closeModal(event: React.MouseEvent<HTMLButtonElement>) {
    setModal({
        show: false,
        title: '',
    })
}