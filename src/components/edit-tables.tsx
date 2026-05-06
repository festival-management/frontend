import React, {useEffect, useState} from "react";

import useTablesApi from "../api/tables.ts";
import {TableName} from "../models/tables.model.ts";
import {useToastContext} from "../contexts/ToastContext.tsx";
import useTableQueries from "../hooks/queries/use-table-queries.ts";

type EditTablesProps = {
    AddComponent: React.ComponentType<{ tablesName: TableName[] }>;
    TableComponent: React.ComponentType<{ tablesName: TableName[] }>;
};

export default function EditTables({AddComponent, TableComponent}: EditTablesProps) {
    const [tablesName, setTablesName] = useState<TableName[]>([]);

    const tablesApi = useTablesApi();

    const {addToast} = useToastContext();
    const {fetchTableName} = useTableQueries(tablesApi);

    const tablesNameData = fetchTableName("name");

    useEffect(() => {
        if (!tablesNameData) return;
        if (tablesNameData.error) return addToast(tablesNameData.code, "error");

        setTablesName(tablesNameData.tables || []);
    }, [tablesNameData]);

    return (
        <>
            <AddComponent tablesName={tablesName}/>
            <TableComponent tablesName={tablesName}/>
        </>
    );
}
