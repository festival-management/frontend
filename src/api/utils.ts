import {useEffect} from "react";

import axios from "axios";
import {useNavigate} from 'react-router-dom';

import errorInterceptor from "./interceptor";
import useTokenJwtUtils from "../hooks/use-token-jwt-utils";

const useHttpClient = (url: string) => {
    const navigate = useNavigate();
    const token = useTokenJwtUtils();

    const http = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.getTokenString()}`,
        },
    });

    useEffect(() => {
        const interceptors = http.interceptors.response.use((response) => response, errorInterceptor(token, navigate));

        return () => {
            http.interceptors.response.eject(interceptors);
        };
    }, [http, token, navigate]);

    return {http, token, navigate};
};

export default useHttpClient;
