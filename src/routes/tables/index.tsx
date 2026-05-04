import {useEffect, useState} from 'react';

import TablesTable from "./TablesTable.tsx";
import useTablesApi from "../../api/tables.ts";
import {Table} from "../../models/tables.model.ts";
import CreateTableForm from "./CreateTableForm.tsx";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import PaginationControls from "../../components/pagination-controls";
import useTableQueries from "../../hooks/queries/use-table-queries.ts";

export default function RouteTables() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [tables, setTables] = useState<Table[]>([]);

    const tablesApi = useTablesApi();

    const {addToast} = useToastContext();
    const {fetchTablesData} = useTableQueries(tablesApi);

    const tablesData = fetchTablesData(page);

    useEffect(() => {
        if (!tablesData) return;

        if (tablesData.error) return addToast(tablesData.code, "error");

        setTables(tablesData.tables!);
        setTotalCount(tablesData.total_count!);
    }, [tablesData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateTableForm tablesApi={tablesApi} setTables={setTables} setTotalCount={setTotalCount}/>
                    <TablesTable tablesApi={tablesApi} tables={tables} setTables={setTables}
                                 setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}
