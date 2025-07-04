import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model";
import {
    CreateSubcategoryResponse,
    GetSubcategoriesNameResponse,
    GetSubcategoriesResponse,
    GetSubcategoryResponse,
    UseSubcategoriesApiInterface
} from "../models/subcategories.model";

const useSubcategoriesApi = (): UseSubcategoriesApiInterface => {
    const {http} = useHttpClient(API.SUBCATEGORIES.toString());

    const addSubcategory = async (name: string) => {
        const response: AxiosResponse<CreateSubcategoryResponse> = await http.post(
            "/",
            {name}
        );

        return response.data;
    };

    const deleteSubcategory = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getSubcategories = async (page: number, orderBy?: string) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetSubcategoriesResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit, order_by: orderBy}}
        );

        return response.data;
    };

    const getSubcategoriesName = async (orderBy?: string) => {
        const response: AxiosResponse<GetSubcategoriesNameResponse> = await http.get(
            "/",
            {params: {order_by: orderBy, only_name: true}}
        );

        return response.data;
    };

    const getSubcategoryById = async (id: number) => {
        const response: AxiosResponse<GetSubcategoryResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    const updateSubcategoryIncludeCoverCharge = async (id: number, includeCoverCharge: boolean) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/include_cover_charge`,
            {include_cover_charge: includeCoverCharge}
        );

        return response.data;
    };

    const updateSubcategoryName = async (id: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {name}
        );

        return response.data;
    };

    const updateSubcategoryOrder = async (id: number, order: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/order`,
            {order}
        );

        return response.data;
    };

    return {
        addSubcategory,
        deleteSubcategory,
        getSubcategories,
        getSubcategoriesName,
        getSubcategoryById,
        updateSubcategoryIncludeCoverCharge,
        updateSubcategoryName,
        updateSubcategoryOrder
    };
}

export default useSubcategoriesApi;
