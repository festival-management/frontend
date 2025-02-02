import {useQuery} from "@tanstack/react-query";

import {GetRolesNameResponse, UseRolesApiInterface} from "../../models/roles.model.ts";

const UseRoleQueries = (rolesApi: UseRolesApiInterface) => {
    const fetchRolesName = (canOrder: boolean): GetRolesNameResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["roles-name", canOrder],
            queryFn: () => rolesApi.getRolesName(canOrder),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchRolesName};
};

export default UseRoleQueries;
