import { kanbanJSON } from "./interfaces/kanbanJSON";
import { nanoid } from "nanoid";

const kanbanDefault:kanbanJSON = {
    'columns': [
        {
            'id': nanoid(),
            'title': 'Tasks',
            'icon': 'inbox',
            'order': 1,
        }
    ],
    'tasks': [],
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

export function setKanbanData(key: string, value: kanbanJSON) {
    if (key) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}