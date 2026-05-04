import React from "react";
import {Link} from "react-router-dom";

import {Table, UseTablesApiInterface} from "../../models/tables.model";
import useTableMutations from "../../hooks/mutations/use-table-mutations.ts";

interface TablesTableProps {
    tablesApi: UseTablesApiInterface;
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function TablesTable({tablesApi, tables, setTables, setTotalCount}: TablesTableProps) {
    const {deleteTableMutation} = useTableMutations(tablesApi);

    const handleDeleteTable = async (id: number) => {
        const response = await deleteTableMutation.mutateAsync(id);

        if (!response.error) {
            setTables((prevState) => prevState.filter((table) => table.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = tables.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.seat_start}</td>
            <td>{v.seat_end}</td>
            <td>
                <Link className="btn btn-primary" to={`/tables/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteTable(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Tables</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Seat Start</th>
                    <th scope="col">Seat End</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </table>
        </>
    );
}
