import React, {useEffect, useRef, useState} from "react";

import {ToastType} from "../models/toast-message.model.ts";

type ToastMessageProps = {
    key: number;
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function ToastMessage({key, message, type, onClose}: ToastMessageProps) {
    const [localVisible, setLocalVisible] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        setLocalVisible(true);
        timerRef.current = setTimeout(() => {
            setLocalVisible(false);
            onClose();
        }, 2000);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [onClose]);

    const toastClass = type === 'error' ? 'text-bg-danger' : 'text-bg-success';

    return (
        localVisible && (
            <div key={key} id={`${type}Toast${key}`} className={`toast show align-items-center ${toastClass} border-0`} role="alert"
                 aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close" onClick={() => setLocalVisible(false)}></button>
                </div>
            </div>
        )
    );
}