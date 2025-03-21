import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import {LoginResponse, RegisterResponse, UseAuthApiInterface} from "../models/auth.model";

const useAuthApi = (): UseAuthApiInterface => {
    const {http, token, navigate} = useHttpClient(API.AUTH.toString());

    const login = async (username: string, password: string) => {
        const response: AxiosResponse<LoginResponse> = await http.post(
            "/token/",
            {username, password},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );
        const r = response.data;

        if (r.error)
            return r;

        token.setTokenJwt(r.access_token!);
        navigate("/");

        return r;
    };

    const register = async (username: string, password: string, roleId: number) => {
        const response: AxiosResponse<RegisterResponse> = await http.post(
            "/register",
            {username, password, role_id: roleId}
        );

        return response.data;
    };

    return {login, register};
};

export default useAuthApi;
