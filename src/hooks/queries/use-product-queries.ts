import {useQuery} from "@tanstack/react-query";

import {GetRolesNameResponse, UseRolesApiInterface} from "../../models/roles.model.ts";
import {GetProductResponse, UseProductsApiInterface} from "../../models/products.model.ts";
import {GetSubcategoriesNameResponse, UseSubcategoriesApiInterface} from "../../models/subcategories.model.ts";

interface UseProductDetailsInterface {
    product: GetProductResponse;
    subcategoriesName: GetSubcategoriesNameResponse;
    rolesName: GetRolesNameResponse;
}

const useProductQueries = (productsApi: UseProductsApiInterface) => {
    const fetchProductDetails = (id: number, subcategoriesApi: UseSubcategoriesApiInterface, rolesApi: UseRolesApiInterface): UseProductDetailsInterface | undefined => {
        const {data} = useQuery({
            queryKey: ["product-details", id],
            queryFn: async () => {
                const [product, subcategoriesName, rolesName] = await Promise.all([
                    productsApi.getProductById(id, true, true, true, true),
                    subcategoriesApi.getSubcategoriesName("order"),
                    rolesApi.getRolesName(true)
                ]);

                return {product, subcategoriesName, rolesName};
            },
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchProductsBySubcategoryId = (page: number, subcategoryId: number, orderBy: string) => {
        const {data} = useQuery({
            queryKey: ["product-details", page, subcategoryId, orderBy],
            queryFn: async () => productsApi.getProducts(page, subcategoryId, orderBy),
            enabled: subcategoryId !== -1,
            staleTime: 0,
        });

        return data;
    };

    return {fetchProductDetails, fetchProductsBySubcategoryId};
};

export default useProductQueries;
