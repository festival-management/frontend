import {useQuery} from "@tanstack/react-query";

import {GetTableResponse, GetTablesResponse, UseTablesApiInterface} from "../../models/tables.model.ts";

const UseTableQueries = (tablesApi: UseTablesApiInterface) => {
    const fetchTableDetails = (id: number): GetTableResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["tables-details", id],
            queryFn: () => tablesApi.getTablesById(id),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchTablesData = (page: number): GetTablesResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["tables", page],
            queryFn: () => tablesApi.getTables(page),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchTableDetails, fetchTablesData};
}

export default UseTableQueries;
