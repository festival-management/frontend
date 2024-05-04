import React from "react";

type CreateSubcategoryFormProps = {
    name: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateSubcategoryForm({name, handleNameChange, handleSubmit}: CreateSubcategoryFormProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h6>Create new subcategory</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newSubcategoryName" className="form-control" value={name} onChange={handleNameChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}