
export type ToastType = 'success' | 'error';

export default interface ToastMessage {
    message: string;
    type: ToastType;
}