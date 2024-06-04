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
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetUsersResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit}}
        );

        return response.data;
    };

    const getUserById = async (id?: number) => {
        if (!id)
            id = token.getToken()?.user_id;

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

    const updateUserPassword = async (password: string, id?: number) => {
        if (!id)
            id = token.getToken()?.user_id;

        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/password`,
            {password}
        );

        return response.data;
    };

    const updateUserRoleId = async (id: number, roleId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/role`,
            {role_id: roleId}
        );

        return response.data;
    };

    return {deleteUser, getUsers, getUserById, updateUserName, updateUserPassword, updateUserRoleId};
}

export default useUsersApi;