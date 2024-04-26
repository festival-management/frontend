import { AxiosResponse } from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import {GetUserResponse} from "../models/users.model";

const useUsersApi = () => {
    const {http, token} = useHttpClient(API.USERS.toString());

    const getUser = async () => {
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

    return {getUser, updateUserPassword};
}

export default useUsersApi;