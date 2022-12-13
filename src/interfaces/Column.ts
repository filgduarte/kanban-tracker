import { Task } from './Task'

export interface Column {
    id: string;
    title: string;
    color?: string;
    icon?: string;
    order: number;
    tasks: Array<Task>
    track: boolean;
}