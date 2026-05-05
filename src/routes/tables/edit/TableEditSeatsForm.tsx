import React from "react";

import {useTableEditContext} from "../../../contexts/TableEditContext.tsx";
import useTableMutations from "../../../hooks/mutations/use-table-mutations.ts";

export default function TableEditSeatsForm() {
    const {
        tableId,
        tableSeatStart,
        setTableSeatStart,
        tableSeatEnd,
        setTableSeatEnd,
        tablesApi
    } = useTableEditContext();

    const {updateTableSeatsMutation} = useTableMutations(tablesApi);

    const handleSeatStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTableSeatStart(parseInt(event.target.value));
    };

    const handleSeatEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTableSeatEnd(parseInt(event.target.value));
    };

    const handleSubmitChangeSeats = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateTableSeatsMutation.mutate({id: tableId, seatStart: tableSeatStart, seatEnd: tableSeatEnd});
    };

    return (
        <>
            <h6>Change seats</h6>
            <form onSubmit={handleSubmitChangeSeats}>
                <div className="input-group mb-3">
                    <span className="input-group-text">Seat Start</span>
                    <input
                        type="number"
                        className="form-control"
                        id="formInputSeatStart"
                        placeholder="Input the seat start of table"
                        step='1'
                        min='1'
                        value={tableSeatStart}
                        onChange={handleSeatStartChange}
                        required
                    />
                    <span className="input-group-text">Seat End</span>
                    <input
                        type="number"
                        className="form-control"
                        id="formInputSeatEnd"
                        placeholder="Input the seat end of table"
                        step='1'
                        min='1'
                        value={tableSeatEnd}
                        onChange={handleSeatEndChange}
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
