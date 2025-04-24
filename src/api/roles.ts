import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import {Permission} from "../enums/permission";
import BaseResponse from "../models/base.model";
import {
    AddRolePrinterResponse,
    CreateRoleResponse,
    GetRoleResponse,
    GetRolesNameResponse,
    GetRolesResponse,
    UseRolesApiInterface
} from "../models/roles.model";

const useRolesApi = (): UseRolesApiInterface => {
    const {http} = useHttpClient(API.ROLES.toString());

    const addRole = async (name: string) => {
        const response: AxiosResponse<CreateRoleResponse> = await http.post(
            "/",
            {name}
        );

        return response.data;
    };

    const addRolePrinter = async (id: number, printerId: number, printerType: string) => {
        const response: AxiosResponse<AddRolePrinterResponse> = await http.post(
            `/${id}/printer`,
            {printer_id: printerId, printer_type: printerType},
        );

        return response.data;
    };

    const deleteRole = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const deleteRolePrinter = async (id: number, rolePrinterId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}/printer/${rolePrinterId}`,
        );

        return response.data;
    };

    const getRoles = async (page: number, includePrinters: boolean = false) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetRolesResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit, include_printers: includePrinters}}
        );

        return response.data;
    };

    const getRolesById = async (id: number, includePrinters: boolean = false) => {
        const response: AxiosResponse<GetRoleResponse> = await http.get(
            `/${id}`,
            {params: {include_printers: includePrinters}}
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

    const updateRolePermissions = async (id: number, permissions: Map<Permission, boolean>) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/permissions`,
            {permissions: Object.fromEntries(permissions)}
        );

        return response.data;
    };

    return {
        addRole,
        addRolePrinter,
        deleteRole,
        deleteRolePrinter,
        getRoles,
        getRolesById,
        getRolesName,
        updateRoleName,
        updateRolePermissions
    };
};

export default useRolesApi;
