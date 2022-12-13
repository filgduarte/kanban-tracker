export interface Task {
    id: string;
    title: string;
    description?: string;
    order: number;
    columnId: string;
    creationDate: Date;
    tracker?: {[key: string]: number};
    lastStatusChange: Date;
}

export interface TaskProps extends Task {
    className?: string;
    key: number;
}