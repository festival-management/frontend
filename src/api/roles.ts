import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model";
import {GetRolesResponse, GetRoleResponse} from "../models/roles.model";

const useRolesApi = () => {
    const {http} = useHttpClient(API.ROLES.toString());

    const addRole = async (name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            "/",
            {name}
        );

        return response.data;
    };

    const getRoles = async (page: number) => {
        const limit = process.env.REACT_APP_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetRolesResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit}}
        );

        return response.data;
    };

    const getRolesById = async (id: number) => {
        const response: AxiosResponse<GetRoleResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    return {addRole, getRoles, getRolesById};
};

export default useRolesApi;
