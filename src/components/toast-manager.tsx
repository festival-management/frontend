import React from "react";

import ToastMessage from "./toast-message.tsx";
import ToastMessageModel from "../models/toast-message.model.ts";

type ToastManagerProps = {
    toasts: ToastMessageModel[];
    removeToast: (index: number) => void;
}

export default function ToastManager({toasts, removeToast}: ToastManagerProps) {
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            {toasts.map((toast, index) => (
                <ToastMessage key={index} {...toast} onClose={() => removeToast(index)}/>
            ))}
        </div>
    );
}