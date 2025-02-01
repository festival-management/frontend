import {useQuery} from "@tanstack/react-query";

import {GetMenuResponse, GetMenusResponse, UseMenusApiInterface} from "../../models/menus.model.ts";
import {GetRolesNameResponse, UseRolesApiInterface} from "../../models/roles.model.ts";
import {GetProductsNameResponse, UseProductsApiInterface} from "../../models/products.model.ts";

interface UseMenuDetailsInterface {
    menu: GetMenuResponse;
    rolesName: GetRolesNameResponse;
    productsName: GetProductsNameResponse;
}

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

    const fetchMenuDetails = (id: number, rolesApi: UseRolesApiInterface, productsApi: UseProductsApiInterface): UseMenuDetailsInterface | undefined => {
        const {data} = useQuery({
            queryKey: ["menu-edit", id],
            queryFn: async () => {
                const [menu, rolesName, productsName] = await Promise.all([
                    menusApi.getMenuById(id, true, true, true),
                    rolesApi.getRolesName(true),
                    productsApi.getProductsName("name"),
                ]);

                return { menu, rolesName, productsName };
            },
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    return { fetchMenusData, fetchMenuDetails };
};

export default useMenuQueries;
