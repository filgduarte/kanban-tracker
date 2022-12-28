import React from "react";

export interface ModalProps {
    show: boolean;
    name: string;
    children?: React.ReactNode;
    className?: string;
}