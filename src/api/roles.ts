import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import {Permission} from "../enums/permission";
import BaseResponse from "../models/base.model";
import {CreateRoleResponse, GetRoleResponse, GetRolesNameResponse, GetRolesResponse} from "../models/roles.model";

const useRolesApi = () => {
    const {http} = useHttpClient(API.ROLES.toString());

    const addRole = async (name: string) => {
        const response: AxiosResponse<CreateRoleResponse> = await http.post(
            "/",
            {name}
        );

        return response.data;
    };

    const deleteRole = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getRoles = async (page: number) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
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

    const getRolesName = async (can_order?: boolean) => {
        const response: AxiosResponse<GetRolesNameResponse> = await http.get(
            "/",
            {params: {only_name: true, can_order}}
        );

        return response.data;
    };

    const updateRoleName = async (id: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {name}
        );

        return response.data;
    };

    const updateRolePermissions = async (id: number, permissions: { [permission in Permission]: boolean }) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/permissions`,
            {permissions}
        );

        return response.data;
    };

    const updateRolePaperSize = async (id: number, paperSize: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/paper_size`,
            {paper_size: paperSize}
        );

        return response.data;
    };

    return {addRole, deleteRole, getRoles, getRolesById, getRolesName, updateRoleName, updateRolePermissions, updateRolePaperSize};
};

export default useRolesApi;
