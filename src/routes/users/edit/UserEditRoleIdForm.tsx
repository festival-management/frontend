import React from "react";

import {RoleName} from "../../../models/roles.model";

type UserEditRoleIdFormProps = {
    rolesName: RoleName[];
    roleId: number;
    handleRoleIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function UserEditRoleIdForm({
                                               rolesName,
                                               roleId,
                                               handleRoleIdChange,
                                               handleSubmit
                                           }: UserEditRoleIdFormProps) {
    return (
        <>
            <h6>Change role</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select id="formInputUserRole" className="form-select" value={roleId} onChange={handleRoleIdChange}>
                        <option value="-1">Open this select menu</option>
                        {rolesName.map((e) => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    );
}