import {useQuery} from "@tanstack/react-query";

import {GetMenuResponse, UseMenusApiInterface} from "../../models/menus.model.ts";
import {GetRolesNameResponse, UseRolesApiInterface} from "../../models/roles.model.ts";
import {GetProductsNameResponse, UseProductsApiInterface} from "../../models/products.model.ts";

interface UseMenuQueriesInterface {
    menu: GetMenuResponse;
    rolesName: GetRolesNameResponse;
    productsName: GetProductsNameResponse;
}

const useMenuQueries = (id: number, menusApi: UseMenusApiInterface, rolesApi: UseRolesApiInterface, productsApi: UseProductsApiInterface): UseMenuQueriesInterface | undefined => {
    const {data} = useQuery({
        queryKey: ["menu-edit", id],
        queryFn: async () => {
            const [menu, rolesName, productsName] = await Promise.all([
                menusApi.getMenuById(id, true, true, true),
                rolesApi.getRolesName(true),
                productsApi.getProductsName("name"),
            ]);

            return {menu, rolesName, productsName};
        },
        enabled: !!id,
        staleTime: 0,
    });

    return data;
};

export default useMenuQueries;
