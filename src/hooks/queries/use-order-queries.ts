import {useQuery} from "@tanstack/react-query";

import {GetOrdersResponse, UseOrdersApiInterface} from "../../models/order.model.ts";

const useOrderQueries = (ordersApi: UseOrdersApiInterface) => {
    const fetchMenusData = (
        page: number,
        orderBy: string,
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
        includeProductsIngredients: boolean
    ): GetOrdersResponse | undefined => {
        const {data} = useQuery({
            queryKey: [
                "orders",
                page,
                orderBy,
                includeMenus,
                includeMenusMenu,
                includeMenusMenuDates,
                includeMenusMenuFields,
                includeMenusMenuFieldsProducts,
                includeMenusMenuFieldsProductsDates,
                includeMenusMenuFieldsProductsIngredients,
                includeMenusMenuFieldsProductsRoles,
                includeMenusMenuFieldsProductsVariants,
                includeMenusMenuRoles,
                includeMenusFields,
                includeMenusFieldsProducts,
                includeMenusFieldsProductsIngredients,
                includeProducts,
                includeProductsProduct,
                includeProductsProductDates,
                includeProductsProductIngredients,
                includeProductsProductRoles,
                includeProductsProductVariants,
                includeProductsIngredients
            ],
            queryFn: () => ordersApi.getOrders(
                page,
                includeMenus,
                includeMenusMenu,
                includeMenusMenuDates,
                includeMenusMenuFields,
                includeMenusMenuFieldsProducts,
                includeMenusMenuFieldsProductsDates,
                includeMenusMenuFieldsProductsIngredients,
                includeMenusMenuFieldsProductsRoles,
                includeMenusMenuFieldsProductsVariants,
                includeMenusMenuRoles,
                includeMenusFields,
                includeMenusFieldsProducts,
                includeMenusFieldsProductsIngredients,
                includeProducts,
                includeProductsProduct,
                includeProductsProductDates,
                includeProductsProductIngredients,
                includeProductsProductRoles,
                includeProductsProductVariants,
                includeProductsIngredients,
                orderBy
            ),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchMenusData};
};

export default useOrderQueries;
