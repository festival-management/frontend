import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {PrinterType} from "../enums/printer-type.ts";
import {
    CreateOrderMenu,
    CreateOrderProduct,
    CreateOrderResponse,
    GetOrderResponse,
    GetOrdersResponse,
    UseOrdersApiInterface
} from "../models/order.model.ts";

const useOrdersApi = (): UseOrdersApiInterface => {
    const {http} = useHttpClient(API.ORDERS.toString());

    const confirmOrder = async (orderId: number, table: number) => {
        const response: AxiosResponse<BaseResponse> = await http.patch(
            `/${orderId}/confirm`,
            {table}
        );

        return response.data;
    };

    const addOrder = async (
        customer: string,
        guests: number | null,
        isTakeAway: boolean,
        table: number | null,
        isVoucher: boolean,
        products: CreateOrderProduct[],
        menus: CreateOrderMenu[]
    ) => {
        const response: AxiosResponse<CreateOrderResponse> = await http.post(
            "/",
            {customer, guests, is_take_away: isTakeAway, table, is_voucher: isVoucher, products, menus},
        );

        return response.data;
    };

    const deleteOrder = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getOrderById = async (
        id: number,
        includeMenus: boolean,
        includeMenusMenu: boolean,
        includeMenusMenuDates: boolean,
        includeMenusMenuFields: boolean,
        includeMenusMenuFieldsProducts: boolean,
        includeMenusMenuFieldsProductsDates: boolean,
        includeMenusMenuFieldsProductsIngredients: boolean,
        includeMenusMenuFieldsProductsRoles: boolean,
        includeMenusMenuFieldsProductsVariants: boolean,
        includeMenusMenuRoles: boolean,
        includeMenusFields: boolean,
        includeMenusFieldsProducts: boolean,
        includeMenusFieldsProductsIngredients: boolean,
        includeProducts: boolean,
        includeProductsProduct: boolean,
        includeProductsProductDates: boolean,
        includeProductsProductIngredients: boolean,
        includeProductsProductRoles: boolean,
        includeProductsProductVariants: boolean,
        includeProductsIngredients: boolean,
        includeUser: boolean,
        includeConfirmerUser: boolean,
    ) => {
        const response: AxiosResponse<GetOrderResponse> = await http.get(
            `/${id}`,
            {
                params: {
                    include_menus: includeMenus,
                    include_menus_menu: includeMenusMenu,
                    include_menus_menu_dates: includeMenusMenuDates,
                    include_menus_menu_fields: includeMenusMenuFields,
                    include_menus_menu_fields_products: includeMenusMenuFieldsProducts,
                    include_menus_menu_fields_products_dates: includeMenusMenuFieldsProductsDates,
                    include_menus_menu_fields_products_ingredients: includeMenusMenuFieldsProductsIngredients,
                    include_menus_menu_fields_products_roles: includeMenusMenuFieldsProductsRoles,
                    include_menus_menu_fields_products_variants: includeMenusMenuFieldsProductsVariants,
                    include_menus_menu_roles: includeMenusMenuRoles,
                    include_menus_fields: includeMenusFields,
                    include_menus_fields_products: includeMenusFieldsProducts,
                    include_menus_fields_products_ingredients: includeMenusFieldsProductsIngredients,
                    include_products: includeProducts,
                    include_products_product: includeProductsProduct,
                    include_products_product_dates: includeProductsProductDates,
                    include_products_product_ingredients: includeProductsProductIngredients,
                    include_products_product_roles: includeProductsProductRoles,
                    include_products_product_variants: includeProductsProductVariants,
                    include_products_ingredients: includeProductsIngredients,
                    include_user: includeUser,
                    include_confirmer_user: includeConfirmerUser,
                }
            }
        );

        return response.data;
    };

    const getOrders = async (
        page: number,
        includeMenus: boolean,
        includeMenusMenu: boolean,
        includeMenusMenuDates: boolean,
        includeMenusMenuFields: boolean,
        includeMenusMenuFieldsProducts: boolean,
        includeMenusMenuFieldsProductsDates: boolean,
        includeMenusMenuFieldsProductsIngredients: boolean,
        includeMenusMenuFieldsProductsRoles: boolean,
        includeMenusMenuFieldsProductsVariants: boolean,
        includeMenusMenuRoles: boolean,
        includeMenusFields: boolean,
        includeMenusFieldsProducts: boolean,
        includeMenusFieldsProductsIngredients: boolean,
        includeProducts: boolean,
        includeProductsProduct: boolean,
        includeProductsProductDates: boolean,
        includeProductsProductIngredients: boolean,
        includeProductsProductRoles: boolean,
        includeProductsProductVariants: boolean,
        includeProductsIngredients: boolean,
        includeUser: boolean,
        includeConfirmerUser: boolean,
        orderBy?: string
    ) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetOrdersResponse> = await http.get(
            "/",
            {
                params: {
                    offset: limit * (page - 1),
                    limit: limit,
                    order_by: orderBy,
                    include_menus: includeMenus,
                    include_menus_menu: includeMenusMenu,
                    include_menus_menu_dates: includeMenusMenuDates,
                    include_menus_menu_fields: includeMenusMenuFields,
                    include_menus_menu_fields_products: includeMenusMenuFieldsProducts,
                    include_menus_menu_fields_products_dates: includeMenusMenuFieldsProductsDates,
                    include_menus_menu_fields_products_ingredients: includeMenusMenuFieldsProductsIngredients,
                    include_menus_menu_fields_products_roles: includeMenusMenuFieldsProductsRoles,
                    include_menus_menu_fields_products_variants: includeMenusMenuFieldsProductsVariants,
                    include_menus_menu_roles: includeMenusMenuRoles,
                    include_menus_fields: includeMenusFields,
                    include_menus_fields_products: includeMenusFieldsProducts,
                    include_menus_fields_products_ingredients: includeMenusFieldsProductsIngredients,
                    include_products: includeProducts,
                    include_products_product: includeProductsProduct,
                    include_products_product_dates: includeProductsProductDates,
                    include_products_product_ingredients: includeProductsProductIngredients,
                    include_products_product_roles: includeProductsProductRoles,
                    include_products_product_variants: includeProductsProductVariants,
                    include_products_ingredients: includeProductsIngredients,
                    include_user: includeUser,
                    include_confirmer_user: includeConfirmerUser,
                }
            }
        );

        return response.data;
    };

    const printOrder = async (orderId: number, printerTypes?: PrinterType[]) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            `/${orderId}/print`,
            {printer_types: printerTypes?.map(pt => pt.toString())},
        );

        return response.data;
    };

    return {confirmOrder, addOrder, deleteOrder, getOrderById, getOrders, printOrder};
}

export default useOrdersApi;