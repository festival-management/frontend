
export type ToastType = 'success' | 'error';

export default interface ToastMessage {
    errorCode: number;
    type: ToastType;
}