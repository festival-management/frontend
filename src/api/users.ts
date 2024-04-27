import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model";
import {GetUserResponse, GetUsersResponse} from "../models/users.model";

const useUsersApi = () => {
    const {http, token} = useHttpClient(API.USERS.toString());

    const deleteUser = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getUsers = async (page: number) => {
        const limit = process.env.REACT_APP_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetUsersResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit}}
        );

        return response.data;
    };

    const getUserById = async (id: number) => {
        const response: AxiosResponse<GetUserResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    const getCurrentUser = async () => {
        const id = token.getToken()?.user_id;
        const response: AxiosResponse<GetUserResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    const updateUserName = async (id: number, username: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {username}
        );

        return response.data;
    };

    const updateUserPassword = async (id: number, password: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/password`,
            {password}
        );

        return response.data;
    };

    const updateCurrentUserPassword = async (password: string) => {
        const id = token.getToken()?.user_id;
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/password`,
            {password}
        );

        return response.data;
    };

    return {deleteUser, getUsers, getUserById, getCurrentUser, updateUserName, updateUserPassword, updateCurrentUserPassword};
}

export default useUsersApi;