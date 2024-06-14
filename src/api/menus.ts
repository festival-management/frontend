import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {CreateMenuResponse, GetMenuResponse, GetMenusResponse} from "../models/menus.model.ts";

const useMenusApi = () => {
    const {http} = useHttpClient(API.MENUS.toString());

    const addMenu = async (name: string, shortName: string, price: number) => {
        const response: AxiosResponse<CreateMenuResponse> = await http.post(
            "/",
            {name, short_name: shortName, price},
        );

        return response.data;
    };

    const deleteMenu = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getMenuById = async (id: number, includeDates: boolean = false, includeFields: boolean = false, includeRoles: boolean = false) => {
        const response: AxiosResponse<GetMenuResponse> = await http.get(
            `/${id}`,
            {
                params: {
                    include_dates: includeDates,
                    include_fields: includeFields,
                    include_roles: includeRoles,
                }
            }
        );

        return response.data;
    };

    const getMenus = async (page: number, orderBy?: string) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetMenusResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit, order_by: orderBy}}
        );

        return response.data;
    };

    return {
        addMenu,
        deleteMenu,
        getMenuById,
        getMenus
    }
}

export default useMenusApi;
