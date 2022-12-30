import { TimeTracker } from "./TimeTracker";

export interface Card {
    id: string;
    title: string;
    description?: string;
    order: number;
    columnId: string;
    creationDate: Date;
    timeTracker: TimeTracker;
    lastStatusChange: Date;
}

export interface CardProps extends Card {
    className?: string;
    key: number;
    onClick?: () => void;
}