import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface kanbanData {
    columns: Array<Column>;
    cards: Array<Card>;
}

export interface Column {
    id: string;
    title: string;
    color?: string;
    icon?: IconProp;
    order: number;
}

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

export interface ColumnProps extends Column {
    className?: string;
    children?: React.ReactNode;
}

export interface TimeTracker {
    [key: string]: number; // [columnId] = seconds
}

export interface FormColumnProps {
    column?: Column | undefined;
    className?: string;
}

export interface FormCardProps {
    card?: Card | undefined;
    className?: string;
}

export interface ModalProps {
    show: boolean;
    title: string;
    children?: React.ReactNode;
    className?: string;
}