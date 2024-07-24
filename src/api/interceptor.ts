import {NavigateFunction} from 'react-router-dom';

import BaseResponse from "../models/base.model.ts";
import {ErrorCodes} from "../errors/ErrorCodes.ts";
import {TokenJwtUtils} from "../models/token-jwt-utils.model";

const errorInterceptor = (token: TokenJwtUtils, navigate: NavigateFunction) => {
    return (error: any) => {
        if (error.response) {
            const responseData = error.response.data as BaseResponse;

            if (
                error.response.status === 401 &&
                responseData.error.code === ErrorCodes.INVALID_JWT_TOKEN.valueOf() &&
                token.isTokenExpired()
            ) {
                token.reset();
                navigate('/login');
            }

            return error.response;
        }

        return Promise.reject(error);
    };
}

export default errorInterceptor;
