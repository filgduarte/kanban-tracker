import { Task } from './Task';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Column {
    id: string;
    title: string;
    color?: string;
    icon?: IconProp;
    order: number;
}

export interface ColumnProps extends Column {
    className?: string;
    tasks: Array<Task>
}