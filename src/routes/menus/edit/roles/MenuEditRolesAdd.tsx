import React from "react";

import {RoleName} from "../../../../models/roles.model.ts";

type MenuEditRolesAddProps = {
    rolesName: RoleName[];
    newMenuRoleId: number;
    handleMenuRoleIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MenuEditRolesAdd({
                                             rolesName,
                                             newMenuRoleId,
                                             handleMenuRoleIdChange,
                                             handleSubmit
                                         }: MenuEditRolesAddProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <select className="form-select" id="newMenuRoleId"
                        value={newMenuRoleId}
                        onChange={handleMenuRoleIdChange}>
                    <option value="-1">Select Roles</option>
                    {Object.values(rolesName).map(roleName => (
                        <option key={roleName.id} value={roleName.id}>{roleName.name}</option>
                    ))}
                </select>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}