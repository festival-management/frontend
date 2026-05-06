import React from "react";

import {TableName} from "../../../../models/tables.model.ts";
import {useRoleEditContext} from "../../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../../hooks/mutations/use-role-mutations.ts";

type RoleEditTablesTableProps = {
    tablesName: TableName[];
}

export default function RoleEditTablesTable({tablesName}: RoleEditTablesTableProps) {
    const {roleId, roleTables, setRoleTables, rolesApi} = useRoleEditContext();
    const {deleteRoleTableMutation} = useRoleMutations(rolesApi);

    const tablesIdName: Map<number, string> = new Map();

    tablesName.map((tableName) => {
        tablesIdName.set(tableName.id, tableName.name);
    });

    const handleDeleteRoleTable = async (roleTableId: number) => {
        const response = await deleteRoleTableMutation.mutateAsync({id: roleId, roleTableId});

        if (!response.error) {
            setRoleTables((prevState) => prevState.filter((roleTable) => roleTable.id !== roleTableId));
        }
    };

    const tableBody: React.JSX.Element[] = roleTables.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{tablesIdName.get(v.table_id)}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteRoleTable(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Table</th>
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
