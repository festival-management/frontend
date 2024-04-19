import BaseResponse from "./base.model";

export interface LoginResponse extends BaseResponse {
    access_token?: string
    token_type?: string
}
