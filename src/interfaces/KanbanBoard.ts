import { Column } from "./Column";
import { Card } from "./Card";

export interface KanbanProps {
    columns: Array<Column>;
    cards: Array<Card>;
    callModal: (name: string, id?: string) => void;
}