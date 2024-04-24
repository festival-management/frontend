import React from "react";

type CreateRoleFormProps = {
    name: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateRoleForm({name, handleNameChange, handleSubmit}: CreateRoleFormProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h6>Create new role</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newRoleName" className="form-control" value={name} onChange={handleNameChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}