import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {
    AddMenuDateResponse,
    AddMenuFieldProductResponse,
    AddMenuFieldResponse,
    AddMenuRoleResponse,
    CreateMenuResponse,
    GetMenuResponse,
    GetMenusResponse,
    UseMenusApiInterface
} from "../models/menus.model.ts";

const useMenusApi = (): UseMenusApiInterface => {
    const {http} = useHttpClient(API.MENUS.toString());

    const addMenu = async (name: string, shortName: string, price: number) => {
        const response: AxiosResponse<CreateMenuResponse> = await http.post(
            "/",
            {name, short_name: shortName, price},
        );

        return response.data;
    };

    const addMenuDate = async (id: number, startDate: string, endDate: string) => {
        const response: AxiosResponse<AddMenuDateResponse> = await http.post(
            `/${id}/date`,
            {start_date: startDate, end_date: endDate}
        );

        return response.data;
    };

    const addMenuField = async (id: number, name: string, maxSortableElements: number, additionalCost: number) => {
        const response: AxiosResponse<AddMenuFieldResponse> = await http.post(
            `/${id}/field`,
            {name, max_sortable_elements: maxSortableElements, additional_cost: additionalCost}
        );

        return response.data;
    };

    const addMenuFieldProduct = async (id: number, menuFieldId: number, price: number, productId: number) => {
        const response: AxiosResponse<AddMenuFieldProductResponse> = await http.post(
            `/${id}/field/${menuFieldId}/product`,
            {price, product_id: productId}
        );

        return response.data;
    };

    const addMenuRole = async (id: number, roleId: number) => {
        const response: AxiosResponse<AddMenuRoleResponse> = await http.post(
            `/${id}/role`,
            {role_id: roleId}
        );

        return response.data;
    };

    const deleteMenu = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const deleteMenuDate = async (id: number, menuDateId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}/date/${menuDateId}`,
        );

        return response.data;
    };

    const deleteMenuField = async (id: number, menuFieldId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}/field/${menuFieldId}`,
        );

        return response.data;
    };

    const deleteMenuFieldProduct = async (id: number, menuFieldId: number, menuFieldProductId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}/field/${menuFieldId}/product/${menuFieldProductId}`,
        );

        return response.data;
    };

    const deleteMenuRole = async (id: number, menuRoleId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}/role/${menuRoleId}`,
        );

        return response.data;
    };

    const getMenuById = async (
        id: number,
        includeDates: boolean,
        includeFields: boolean,
        includeFieldsProducts: boolean,
        includeFieldsProductsDates: boolean,
        includeFieldsProductsIngredients: boolean,
        includeFieldsProductsRoles: boolean,
        includeFieldsProductsVariants: boolean,
        includeRoles: boolean
    ) => {
        const response: AxiosResponse<GetMenuResponse> = await http.get(
            `/${id}`,
            {
                params: {
                    include_dates: includeDates,
                    include_fields: includeFields,
                    include_fields_products: includeFieldsProducts,
                    include_fields_products_dates: includeFieldsProductsDates,
                    include_fields_products_ingredients: includeFieldsProductsIngredients,
                    include_fields_products_roles: includeFieldsProductsRoles,
                    include_fields_products_variants: includeFieldsProductsVariants,
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

    const getAllMenusUser = async (
        orderBy: string,
        includeFields: boolean,
        includeFieldsProducts: boolean,
        includeFieldsProductsIngredients: boolean,
        includeFieldsProductsVariants: boolean
    ) => {
        const response: AxiosResponse<GetMenusResponse> = await http.get(
            "/",
            {
                params: {
                    order_by: orderBy,
                    include_fields: includeFields,
                    include_fields_products: includeFieldsProducts,
                    include_fields_products_ingredients: includeFieldsProductsIngredients,
                    include_fields_products_variants: includeFieldsProductsVariants
                }
            }
        );

        return response.data;
    };

    const updateMenuDailyMaxSales = async (id: number, dailyMaxSales: number | null) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/daily_max_sales`,
            {daily_max_sales: dailyMaxSales}
        );

        return response.data;
    }

    const updateMenuFieldName = async (id: number, menuFieldId: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/field/${menuFieldId}/name`,
            {name}
        );

        return response.data;
    };

    const updateMenuFieldIsOptional = async (id: number, menuFieldId: number, isOptional: boolean) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/field/${menuFieldId}/is_optional`,
            {is_optional: isOptional}
        );

        return response.data;
    };

    const updateMenuFieldMaxSortableElements = async (id: number, menuFieldId: number, maxSortableElements: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/field/${menuFieldId}/max_sortable_elements`,
            {max_sortable_elements: maxSortableElements}
        );

        return response.data;
    };

    const updateMenuFieldAdditionalCost = async (id: number, menuFieldId: number, additionalCost: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/field/${menuFieldId}/additional_cost`,
            {additional_cost: additionalCost}
        );

        return response.data;
    };

    const updateMenuFieldCanExceedMaxSortable = async (id: number, menuFieldId: number, canExceedMaxSortable: boolean) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/field/${menuFieldId}/can_exceed_max_sortable`,
            {can_exceed_max_sortable: canExceedMaxSortable}
        );

        return response.data;
    };

    const updateMenuName = async (id: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {name}
        );

        return response.data;
    };

    const updateMenuShortName = async (id: number, shortName: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/short_name`,
            {short_name: shortName}
        );

        return response.data;
    };

    const updateMenuPrice = async (id: number, price: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/price`,
            {price}
        );

        return response.data;
    };

    return {
        addMenu,
        addMenuDate,
        addMenuField,
        addMenuFieldProduct,
        addMenuRole,
        deleteMenu,
        deleteMenuDate,
        deleteMenuField,
        deleteMenuFieldProduct,
        deleteMenuRole,
        getMenuById,
        getMenus,
        getAllMenusUser,
        updateMenuDailyMaxSales,
        updateMenuFieldName,
        updateMenuFieldIsOptional,
        updateMenuFieldMaxSortableElements,
        updateMenuFieldAdditionalCost,
        updateMenuFieldCanExceedMaxSortable,
        updateMenuName,
        updateMenuPrice,
        updateMenuShortName
    }
}

export default useMenusApi;
