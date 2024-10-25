import {useEffect, useRef, useState} from "react";

import {ToastType} from "../models/toast-message.model.ts";
import getErrorMessage from "../errors/errorMessages.ts";

type ToastMessageProps = {
    index: number;
    errorCode: number;
    type: ToastType;
    onClose: () => void;
}

export default function ToastMessage({index, errorCode, type, onClose}: ToastMessageProps) {
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
            <div id={`${type}Toast${index}`} className={`toast show align-items-center ${toastClass} border-0`} role="alert"
                 aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {getErrorMessage(errorCode)}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close" onClick={() => setLocalVisible(false)}></button>
                </div>
            </div>
        )
    );
}