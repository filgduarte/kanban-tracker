import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface KanbanData {
    columns: Array<Column>;
    cards: Array<Card>;
}

export interface Column {
    id: string;
    title: string;
    color: string;
    icon: IconProp;
    order: number;
    archiveAfter: number;
}

export interface ColumnProps extends Column {
    className?: string;
    children?: React.ReactNode;
}

export interface Card {
    id: string;
    title: string;
    description?: string;
    order: number;
    columnId: string;
    creationDate: number;
    timeTracker: TimeTracker;
    lastChange: number;
}

export interface CardProps extends Card {
    className?: string;
    key: number;
    onClick?: () => void;
}

export interface TimeTracker {
    [key: string]: number; // [columnId] = seconds
}

export interface ModalProps {
    show: boolean;
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

export interface FormColumnProps {
    column?: Column | undefined;
    className?: string;
}

export interface FormCardProps {
    columnId: string;
    card?: Card | undefined;
    className?: string;
}

export interface TimeTrackerProps {
    card: Card;
}

export interface ActionButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    label?: string;
    icon?: IconProp;
    title?: string;
    className?: string;
    key?: number | string;
}