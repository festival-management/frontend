import React from "react";

import {useTableEditContext} from "../../../contexts/TableEditContext.tsx";
import useTableMutations from "../../../hooks/mutations/use-table-mutations.ts";

export default function TableEditNameForm() {
    const {tableId, tableName, setTableName, tablesApi} = useTableEditContext();

    const {updateTableNameMutation} = useTableMutations(tablesApi);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTableName(event.target.value);
    };

    const handleSubmitChangeName = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateTableNameMutation.mutate({id: tableId, name: tableName});
    };

    return (
        <>
            <h6>Change name</h6>
            <form onSubmit={handleSubmitChangeName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputName"
                        placeholder="Input the name of table"
                        value={tableName}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}
