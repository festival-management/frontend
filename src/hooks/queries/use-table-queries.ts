import {useQuery} from "@tanstack/react-query";

import {GetTablesResponse, UseTablesApiInterface} from "../../models/tables.model.ts";

const UseTableQueries = (tablesApi: UseTablesApiInterface) => {
    const fetchTablesData = (page: number): GetTablesResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["tables", page],
            queryFn: () => tablesApi.getTables(page),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchTablesData};
}

export default UseTableQueries;
