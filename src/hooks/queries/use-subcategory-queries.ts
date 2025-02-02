import {useQuery} from "@tanstack/react-query";

import {GetSubcategoriesNameResponse, UseSubcategoriesApiInterface} from "../../models/subcategories.model.ts";

const UseSubcategoryQueries = (subcategoriesApi: UseSubcategoriesApiInterface) => {
    const fetchSubcategoriesName = (orderBy: string): GetSubcategoriesNameResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["subcategories-name", orderBy],
            queryFn: () => subcategoriesApi.getSubcategoriesName(orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchSubcategoriesName};
};

export default UseSubcategoryQueries;
