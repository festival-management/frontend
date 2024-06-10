import React from "react";

type ProductEditDatesAddProps = {
    newProductDateStartDate: string;
    newProductDateEndDate: string;
    handleProductDateStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProductDateEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditDatesAdd({
                                                newProductDateStartDate,
                                                newProductDateEndDate,
                                                handleProductDateStartDateChange,
                                                handleProductDateEndDateChange,
                                                handleSubmit
                                            }: ProductEditDatesAddProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <input type="datetime-local" id="newProductDateStartDate" className="form-control" value={newProductDateStartDate}
                       onChange={handleProductDateStartDateChange}
                       required/>
                <span className="input-group-text">End date</span>
                <input type="datetime-local" id="newProductDateEndDate" className="form-control" value={newProductDateEndDate}
                       onChange={handleProductDateEndDateChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}