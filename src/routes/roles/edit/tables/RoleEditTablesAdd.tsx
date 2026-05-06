import React, {useState} from "react";

import {TableName} from "../../../../models/tables.model.ts";
import {useRoleEditContext} from "../../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../../hooks/mutations/use-role-mutations.ts";

type RoleEditTablesAddProps = {
    tablesName: TableName[];
}

export default function RoleEditTablesAdd({tablesName}: RoleEditTablesAddProps) {
    const [newRoleTableId, setNewRoleTableId] = useState(-1);

    const {roleId, setRoleTables, rolesApi} = useRoleEditContext();
    const {addRoleTableMutation} = useRoleMutations(rolesApi);

    const handleRoleTableIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRoleTableId(parseInt(event.target.value));
    };

    const handleSubmitAddTable = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addRoleTableMutation.mutateAsync({
            id: roleId,
            tableId: newRoleTableId
        });

        if (!response.error) {
            setRoleTables((prevState) => [...prevState, response.table!]);
        }

        setNewRoleTableId(-1);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddTable}>
            <div className="input-group mb-3">
                <span className="input-group-text">Table</span>
                <select className="form-select" id="newtRoleTableId"
                        value={newRoleTableId}
                        onChange={handleRoleTableIdChange}>
                    <option value="-1">Select Tables</option>
                    {Object.values(tablesName).map(tableName => (
                        <option key={tableName.id} value={tableName.id}>{tableName.name}</option>
                    ))}
                </select>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}
