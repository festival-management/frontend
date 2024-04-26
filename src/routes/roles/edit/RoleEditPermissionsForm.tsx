import React from "react";

import {Permission} from "../../../enums/permission";

type RoleEditPermissionsFormProps = {
    selectedPermissions: Record<Permission, boolean>;
    handlePermissionToggle: (permission: Permission) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function RoleEditPermissionsForm({
                                                    selectedPermissions,
                                                    handlePermissionToggle,
                                                    handleSubmit
                                                }: RoleEditPermissionsFormProps) {
    return (
        <>
            <h6>Change permissions</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    {Object.values(Permission).map(permission => (
                        <div className="form-check" key={permission}>
                            <input className="form-check-input" type="checkbox" id={permission}
                                   checked={selectedPermissions[permission]}
                                   onChange={() => handlePermissionToggle(permission)}/>
                            <label className="form-check-label" htmlFor={permission}>
                                {permission.replaceAll("_", " ")}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}