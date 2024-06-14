import React from "react";

type CreateMenuFormProps = {
    name: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shortName: string;
    handleShortNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    price: number;
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateMenuForm({
                                           name,
                                           handleNameChange,
                                           shortName,
                                           handleShortNameChange,
                                           price,
                                           handlePriceChange,
                                           handleSubmit
                                       }: CreateMenuFormProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h6>Create new menu</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newMenuName" className="form-control" value={name} onChange={handleNameChange}
                       required/>
                <span className="input-group-text">Short name</span>
                <input type="text" id="newMenuShortName" className="form-control" value={shortName}
                       onChange={handleShortNameChange}
                       required/>
                <span className="input-group-text">Price</span>
                <input type="number" id="newMenuPrice" className="form-control" value={price} step='0.01'
                       onChange={handlePriceChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}