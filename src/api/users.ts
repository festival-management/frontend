import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import {GetUserResponse, GetUsersResponse} from "../models/users.model";

const useUsersApi = () => {
    const {http, token} = useHttpClient(API.USERS.toString());

    const getUsers = async (page: number) => {
        const limit = process.env.REACT_APP_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetUsersResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit}}
        );

        return response.data;
    };

    const getUserById = async () => {
        const id = token.getToken()?.user_id;
        const response: AxiosResponse<GetUserResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    const updateUserPassword = async (password: string) => {
        const id = token.getToken()?.user_id;
        const response: AxiosResponse<GetUserResponse> = await http.put(
            `/${id}/password`,
            {password}
        );

        return response.data;
    };

    return {getUsers, getUserById, updateUserPassword};
}

export default useUsersApi;