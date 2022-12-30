import { kanbanData } from "./types";
import { nanoid } from "nanoid";

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