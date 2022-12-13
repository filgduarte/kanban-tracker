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