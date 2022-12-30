import React from "react";

export interface ModalProps {
    show: boolean;
    title: string;
    children?: React.ReactNode;
    className?: string;
}