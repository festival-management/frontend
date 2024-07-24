
export interface BaseResponseError {
    code: number;
    details: Map<string, any>;
}

export default interface BaseResponse {
    error: BaseResponseError;
    message: string;
}
