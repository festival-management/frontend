import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model";
import {
    CreateProductResponse,
    GetProductResponse,
    GetProductsNameResponse,
    GetProductsResponse
} from "../models/products.model";

const useProductsApi = () => {
    const {http} = useHttpClient(API.PRODUCTS.toString());

    const addProduct = async (name: string, shortName: string, price: number, category: string, subcategoryId: number) => {
        const response: AxiosResponse<CreateProductResponse> = await http.post(
            "/",
            {name, short_name: shortName, price, category, subcategory_id: subcategoryId}
        );

        return response.data;
    };

    const addProductDate = async (id: number, startDate: Date, endDate: Date) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            `/${id}/date`,
            {start_date: startDate, end_date: endDate}
        );

        return response.data;
    };

    const addProductIngredient = async (id: number, name: string, price: number) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            `/${id}/ingredient`,
            {name, price}
        );

        return response.data;
    };

    const addProductRole = async (id: number, roleId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            `/${id}/role`,
            {role_id: roleId}
        );

        return response.data;
    };

    const addProductVariant = async (id: number, name: string, price: number) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            `/${id}/variant`,
            {name, price}
        );

        return response.data;
    };

    const deleteProduct = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getProductById = async (id: number) => {
        const response: AxiosResponse<GetProductResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    const getProducts = async (page: number, subcategoryId?: number, orderBy?: string) => {
        const limit = process.env.REACT_APP_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetProductsResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit, order_by: orderBy, subcategory_id: subcategoryId}}
        );

        return response.data;
    };

    const getProductsName = async (orderBy?: string) => {
        const response: AxiosResponse<GetProductsNameResponse> = await http.get(
            "/",
            {params: {order_by: orderBy, only_name: true}}
        );

        return response.data;
    };

    return {
        addProduct,
        addProductDate,
        addProductIngredient,
        addProductRole,
        addProductVariant,
        deleteProduct,
        getProductById,
        getProducts,
        getProductsName
    };
}

export default useProductsApi;
