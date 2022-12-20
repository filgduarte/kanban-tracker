import { TimeTracker } from "./TimeTracker";

export interface Task {
    id: string;
    title: string;
    description?: string;
    order: number;
    columnId: string;
    creationDate: Date;
    timeTracker: TimeTracker;
    lastStatusChange: Date;
}

export interface TaskProps extends Task {
    className?: string;
    key: number;
}