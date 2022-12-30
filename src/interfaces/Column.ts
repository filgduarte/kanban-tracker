import React from 'react';
import { Card } from './Card';
import { ModalProps } from './Modal';
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
    children?: React.ReactNode;
}