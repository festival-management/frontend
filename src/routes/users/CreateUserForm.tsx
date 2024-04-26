import React from "react";

import {RoleName} from "../../models/roles.model";

type CreateUserFormProps = {
    name: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    roleId: string;
    handleRoleIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    rolesName: RoleName[];
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateUserForm({
                                           name,
                                           handleNameChange,
                                           password,
                                           handlePasswordChange,
                                           roleId,
                                           handleRoleIdChange,
                                           rolesName,
                                           handleSubmit
                                       }: CreateUserFormProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h6>Create new user</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newUserName" className="form-control" value={name} onChange={handleNameChange}
                       required/>
                <span className="input-group-text">Password</span>
                <input type="password" id="newUserPassword" className="form-control" value={password}
                       onChange={handlePasswordChange}
                       required/>
                <span className="input-group-text">Role</span>
                <select className="form-select" value={roleId} onChange={handleRoleIdChange}>
                    <option value="-1">Open this select menu</option>
                    {rolesName.map((e) => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}