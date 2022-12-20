import { Column } from './Column';
import { Task } from './Task';

export interface kanbanJSON {
    columns: Array<Column>;
    tasks: Array<Task>;
}