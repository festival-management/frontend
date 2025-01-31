import {useState} from "react";

import ToastMessage, {ToastType} from "../models/toast-message.model.ts";
import {UseToastInterface} from "../models/toasts.model.ts";

const useToasts = (): UseToastInterface => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (errorCode: number, type: ToastType) => {
        setToasts(prev => [{ errorCode, type }, ...prev]);
    };

    const removeToast = (index: number) => {
        setToasts(prev => prev.filter((_, i) => i !== index));
    };

    return { toasts, addToast, removeToast };
};

export default useToasts;
