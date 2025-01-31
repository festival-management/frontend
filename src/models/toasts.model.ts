import ToastMessage, {ToastType} from "./toast-message.model.ts";

export interface UseToastInterface {
    toasts: ToastMessage[];
    addToast: (errorCode: number, type: ToastType) => void;
    removeToast: (index: number) => void;
}
