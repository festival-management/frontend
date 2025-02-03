import {useQuery} from "@tanstack/react-query";

import {
    GetSubcategoriesNameResponse,
    GetSubcategoriesResponse,
    GetSubcategoryResponse,
    UseSubcategoriesApiInterface
} from "../../models/subcategories.model.ts";

const UseSubcategoryQueries = (subcategoriesApi: UseSubcategoriesApiInterface) => {
    const fetchSubcategoryDetails = (id: number): GetSubcategoryResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["subcategories-details", id],
            queryFn: () => subcategoriesApi.getSubcategoryById(id),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchSubcategoriesName = (orderBy: string): GetSubcategoriesNameResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["subcategories-name", orderBy],
            queryFn: () => subcategoriesApi.getSubcategoriesName(orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchSubcategoriesData = (page: number, orderBy: string): GetSubcategoriesResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["subcategories", page, orderBy],
            queryFn: () => subcategoriesApi.getSubcategories(page, orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchSubcategoryDetails, fetchSubcategoriesName, fetchSubcategoriesData};
};

export default UseSubcategoryQueries;
