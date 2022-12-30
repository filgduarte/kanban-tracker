import { Column } from './Column';
import { Card } from './Card';

export interface kanbanJSON {
    columns: Array<Column>;
    cards: Array<Card>;
}