import {useQuery} from "@tanstack/react-query";

import {
    GetProductResponse,
    GetProductsNameResponse,
    GetProductsResponse,
    UseProductsApiInterface
} from "../../models/products.model.ts";

const useProductQueries = (productsApi: UseProductsApiInterface) => {
    const fetchProductDetails = (id: number, includeDates: boolean, includeIngredients: boolean, includeRoles: boolean, includeVariants: boolean): GetProductResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["product-details", id, includeDates, includeIngredients, includeRoles, includeVariants],
            queryFn: async () => productsApi.getProductById(id, includeDates, includeIngredients, includeRoles, includeVariants),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchProductsName = (orderBy: string): GetProductsNameResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["products-name", orderBy],
            queryFn: () => productsApi.getProductsName(orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchAllProductsUser = (orderBy: string, includeIngredients: boolean, includeVariants: boolean): GetProductsResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["products-user", orderBy, includeIngredients, includeVariants],
            queryFn: () => productsApi.getAllProductsUser(orderBy, includeIngredients, includeVariants),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchProductsBySubcategoryId = (page: number, subcategoryId: number, orderBy: string): GetProductsResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["products-by-subcategory-id", page, subcategoryId, orderBy],
            queryFn: async () => productsApi.getProducts(page, subcategoryId, orderBy),
            enabled: subcategoryId !== -1,
            staleTime: 0,
        });

        return data;
    };

    return {fetchProductDetails, fetchProductsName, fetchAllProductsUser, fetchProductsBySubcategoryId};
};

export default useProductQueries;
