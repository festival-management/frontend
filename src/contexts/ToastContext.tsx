import {createContext, ReactNode, useContext} from 'react';

import {UseToastInterface} from "../models/toasts.model.ts";
import useToasts from "../hooks/use-toasts.ts";
import ToastManager from "../components/toast-manager.tsx";

const ToastContext = createContext<UseToastInterface | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({children}: ToastProviderProps) => {
    const {toasts, addToast, removeToast} = useToasts();

    return (
        <ToastContext.Provider value={{toasts, addToast, removeToast}}>
            {children}
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }

    return context;
};