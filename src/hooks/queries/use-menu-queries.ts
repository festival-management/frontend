import {useQuery} from "@tanstack/react-query";

import {GetMenuResponse, GetMenusResponse, UseMenusApiInterface} from "../../models/menus.model.ts";

const useMenuQueries = (menusApi: UseMenusApiInterface) => {
    const fetchMenusData = (page: number, orderBy: string): GetMenusResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["menus", page],
            queryFn: () => menusApi.getMenus(page, orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchMenuDetails = (id: number, includeDates: boolean, includeFields: boolean, includeRoles: boolean): GetMenuResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["menu-edit", id, includeDates, includeFields, includeRoles],
            queryFn: async () => menusApi.getMenuById(id, includeDates, includeFields, includeRoles),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchAllMenusUser = (orderBy: string, includeFields: boolean): GetMenusResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["menu-user", orderBy, includeFields],
            queryFn: async () => menusApi.getAllMenusUser(orderBy, includeFields),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchMenusData, fetchMenuDetails, fetchAllMenusUser};
};

export default useMenuQueries;
