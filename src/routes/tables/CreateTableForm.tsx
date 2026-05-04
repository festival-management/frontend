import React, {useState} from "react";

import {Table, UseTablesApiInterface} from "../../models/tables.model.ts";
import useTableMutations from "../../hooks/mutations/use-table-mutations.ts";

type CreateTableFormProps = {
    tablesApi: UseTablesApiInterface;
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateTableForm({tablesApi, setTables, setTotalCount}: CreateTableFormProps) {
    const [newTableName, setNewTableName] = useState("");
    const [newTableSeatStart, setNewTableSeatStart] = useState(1);
    const [newTableSeatEnd, setNewTableSeatEnd] = useState(1);

    const {addTableMutation} = useTableMutations(tablesApi);

    const handleNewTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTableName(event.target.value);
    };

    const handleNewTableSeatStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTableSeatStart(parseInt(event.target.value));
    };

    const handleNewTableSeatEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTableSeatEnd(parseInt(event.target.value));
    };

    const handleSubmitAddTable = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addTableMutation.mutateAsync({
            name: newTableName,
            seatStart: newTableSeatStart,
            seatEnd: newTableSeatEnd,
        });

        if (!response.error) {
            setTables((prevState) => [...prevState, response.table!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewTableName("");
        setNewTableSeatStart(1);
        setNewTableSeatEnd(1);
    }

    return (
        <form className="mb-3" onSubmit={handleSubmitAddTable}>
            <h6>Create new table</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newTableName" className="form-control" value={newTableName}
                       onChange={handleNewTableNameChange}
                       required/>
                <input type="number" id="newTableSeatStart" className="form-control"
                       value={newTableSeatStart}
                       step='1'
                       min='1'
                       onChange={handleNewTableSeatStartChange}
                       required/>
                <input type="number" id="newTableSeatEnd" className="form-control"
                       value={newTableSeatEnd}
                       step='1'
                       min='1'
                       onChange={handleNewTableSeatEndChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}
