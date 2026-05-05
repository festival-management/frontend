import {useEffect} from 'react';
import {useParams} from "react-router-dom";

import TableEditNameForm from "./TableEditNameForm.tsx";
import TableEditSeatsForm from "./TableEditSeatsForm.tsx";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useTableQueries from "../../../hooks/queries/use-table-queries.ts";
import {useTableEditContext} from "../../../contexts/TableEditContext.tsx";

export default function RouteTableEdit() {
    const {id} = useParams();

    const {addToast} = useToastContext();
    const {
        setTableId,
        setTableName,
        setTableSeatStart,
        setTableSeatEnd,
        tablesApi
    } = useTableEditContext();
    const {fetchTableDetails} = useTableQueries(tablesApi);

    const tableData = fetchTableDetails(parseInt(id || "-1"));

    useEffect(() => {
        if (!tableData) return;

        if (tableData.error) return addToast(tableData.code, "error");

        setTableId(tableData.id!);
        setTableName(tableData.name!);
        setTableSeatStart(tableData.seat_start!);
        setTableSeatEnd(tableData.seat_end!);
    }, [tableData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <TableEditNameForm/>
                    <TableEditSeatsForm/>
                </div>
            </div>
        </div>
    );
}
