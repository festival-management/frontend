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

    const addProductDate = async (id: number, startDate: string, endDate: string) => {
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

    const deleteProductDate = async (id: number, productDateId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}/date/${productDateId}`,
        );

        return response.data;
    };

    const getProductById = async (id: number, includeDates: boolean = false, includeIngredients: boolean = false, includeRoles: boolean = false, includeVariants: boolean = false) => {
        const response: AxiosResponse<GetProductResponse> = await http.get(
            `/${id}`,
            {
                params: {
                    include_dates: includeDates,
                    include_ingredients: includeIngredients,
                    include_roles: includeRoles,
                    include_variants: includeVariants
                }
            }
        );

        return response.data;
    };

    const getProducts = async (page: number, subcategoryId?: number, orderBy?: string) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
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

    const updateProductCategory = async (id: number, category: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/category`,
            {category}
        );

        return response.data;
    };

    const updateProductIsPriority = async (id: number, isPriority: boolean) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/priority`,
            {is_priority: isPriority}
        );

        return response.data;
    };

    const updateProductName = async (id: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {name}
        );

        return response.data;
    };

    const updateProductPrice = async (id: number, price: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/price`,
            {price}
        );

        return response.data;
    };

    const updateProductShortName = async (id: number, shortName: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/short_name`,
            {short_name: shortName}
        );

        return response.data;
    };

    const updateProductSubcategory = async (id: number, subcategoryId: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/subcategory`,
            {subcategory_id: subcategoryId}
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
        deleteProductDate,
        getProductById,
        getProducts,
        getProductsName,
        updateProductCategory,
        updateProductIsPriority,
        updateProductName,
        updateProductPrice,
        updateProductShortName,
        updateProductSubcategory
    };
}

export default useProductsApi;
