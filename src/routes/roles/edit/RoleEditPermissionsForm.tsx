import React from "react";

import {Permission} from "../../../enums/permission";
import {useRoleEditContext} from "../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../hooks/mutations/use-role-mutations.ts";

export default function RoleEditPermissionsForm() {
    const {roleId, rolePermissions, setRolePermissions, rolesApi} = useRoleEditContext();
    const {updateRolePermissionsMutation} = useRoleMutations(rolesApi);

    const handlePermissionToggle = (permission: Permission) => {
        setRolePermissions(prevState => {
            const newState = new Map(prevState);
            const currentValue = newState.get(permission) || false;
            newState.set(permission, !currentValue);
            return newState;
        });
    };

    const handleSubmitChangePermissions = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRolePermissionsMutation.mutate({id: roleId, permissions: rolePermissions});
    };

    return (
        <>
            <h6>Change permissions</h6>
            <form onSubmit={handleSubmitChangePermissions}>
                <div className="mb-3">
                    {Object.values(Permission).map(permission => (
                        <div className="form-check form-switch" key={permission}>
                            <input className="form-check-input" type="checkbox" id={permission}
                                   checked={rolePermissions?.get(permission) ?? false}
                                   onChange={() => handlePermissionToggle(permission as Permission)}/>
                            <label className="form-check-label" htmlFor={permission}>
                                {permission.toString().replaceAll("_", " ")}
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