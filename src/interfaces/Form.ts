import { Column } from "./Column";
import { Card } from "./Card";

export interface FormColumnProps {
    column?: Column | undefined;
    // action: (object: Column) => void;
    className?: string;
}

export interface FormCardProps {
    card?: Card | undefined;
    // action: (object: Card) => void;
    className?: string;
}