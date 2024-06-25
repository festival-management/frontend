import React from "react";

type MenuEditDatesAddProps = {
    newMenuDateStartDate: string;
    newMenuDateEndDate: string;
    handleMenuDateStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMenuDateEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MenuEditDatesAdd({
                                             newMenuDateStartDate,
                                             newMenuDateEndDate,
                                             handleMenuDateStartDateChange,
                                             handleMenuDateEndDateChange,
                                             handleSubmit
                                         }: MenuEditDatesAddProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <input type="datetime-local" id="newMenuDateStartDate" className="form-control"
                       value={newMenuDateStartDate}
                       onChange={handleMenuDateStartDateChange}
                       required/>
                <span className="input-group-text">End date</span>
                <input type="datetime-local" id="newMenuDateEndDate" className="form-control" value={newMenuDateEndDate}
                       onChange={handleMenuDateEndDateChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}