import {useQuery} from "@tanstack/react-query";

import {GetMenuResponse, GetMenusResponse, UseMenusApiInterface} from "../../models/menus.model.ts";

const useMenuQueries = (menusApi: UseMenusApiInterface) => {
    const fetchMenusData = (page: number, orderBy: string): GetMenusResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["menus", page, orderBy],
            queryFn: () => menusApi.getMenus(page, orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchMenuDetails = (
        id: number,
        includeDates: boolean,
        includeFields: boolean,
        includeFieldsProducts: boolean,
        includeFieldsProductsDates: boolean,
        includeFieldsProductsIngredients: boolean,
        includeFieldsProductsRoles: boolean,
        includeFieldsProductsVariants: boolean,
        includeRoles: boolean
    ): GetMenuResponse | undefined => {
        const {data} = useQuery({
            queryKey: [
                "menu-edit",
                id,
                includeDates,
                includeFields,
                includeFieldsProducts,
                includeFieldsProductsDates,
                includeFieldsProductsIngredients,
                includeFieldsProductsRoles,
                includeFieldsProductsVariants,
                includeRoles
            ],
            queryFn: async () => menusApi.getMenuById(
                id,
                includeDates,
                includeFields,
                includeFieldsProducts,
                includeFieldsProductsDates,
                includeFieldsProductsIngredients,
                includeFieldsProductsRoles,
                includeFieldsProductsVariants,
                includeRoles
            ),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchAllMenusUser = (
        orderBy: string,
        includeFields: boolean,
        includeFieldsProducts: boolean,
        includeFieldsProductsIngredients: boolean,
        includeFieldsProductsVariants: boolean
    ): GetMenusResponse | undefined => {
        const {data} = useQuery({
            queryKey: [
                "menu-user",
                orderBy,
                includeFields,
                includeFieldsProducts,
                includeFieldsProductsIngredients,
                includeFieldsProductsVariants
            ],
            queryFn: async () => menusApi.getAllMenusUser(
                orderBy,
                includeFields,
                includeFieldsProducts,
                includeFieldsProductsIngredients,
                includeFieldsProductsVariants
            ),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchMenusData, fetchMenuDetails, fetchAllMenusUser};
};

export default useMenuQueries;
