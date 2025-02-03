import {useQuery} from "@tanstack/react-query";

import {
    GetSubcategoriesNameResponse,
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

    return {fetchSubcategoryDetails, fetchSubcategoriesName};
};

export default UseSubcategoryQueries;
