import {useQuery} from "@tanstack/react-query";

import {
    GetRoleResponse,
    GetRolesNameResponse,
    GetRolesResponse,
    UseRolesApiInterface
} from "../../models/roles.model.ts";

const UseRoleQueries = (rolesApi: UseRolesApiInterface) => {
    const fetchRoleDetails = (id: number): GetRoleResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["roles-details", id],
            queryFn: () => rolesApi.getRolesById(id),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchRolesName = (canOrder: boolean): GetRolesNameResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["roles-name", canOrder],
            queryFn: () => rolesApi.getRolesName(canOrder),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchRolesData = (page: number): GetRolesResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["roles", page],
            queryFn: () => rolesApi.getRoles(page),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchRoleDetails, fetchRolesName, fetchRolesData};
};

export default UseRoleQueries;
