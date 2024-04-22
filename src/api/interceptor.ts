import { NavigateFunction } from 'react-router-dom';

import { TokenJwtUtils } from "../models/token-jwt-utils.model";

const errorInterceptor = (token: TokenJwtUtils, navigate: NavigateFunction) => {
    return (error: any) => {
        if (error.response) {
            const responseData = error.response.data;

            if (
                error.response.status === 401 &&
                responseData.error &&
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
