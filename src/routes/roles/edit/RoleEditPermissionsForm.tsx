import React, {useState} from "react";

import {Permission} from "../../../enums/permission";
import {UseRolesApiInterface} from "../../../models/roles.model.ts";
import useRoleMutations from "../../../hooks/mutations/use-role-mutations.ts";

type RoleEditPermissionsFormProps = {
    rolesApi: UseRolesApiInterface;
    roleId: number;
    rolePermissions: Record<Permission, boolean>;
}

export default function RoleEditPermissionsForm({rolesApi, roleId, rolePermissions}: RoleEditPermissionsFormProps) {
    const [newRolePermissions, setNewRolePermissions] = useState(rolePermissions);

    const {updateRolePermissionsMutation} = useRoleMutations(rolesApi);

    const handlePermissionToggle = (permission: Permission) => {
        setNewRolePermissions(prevState => ({
            ...prevState,
            [permission]: !prevState[permission]
        }));
    };

    const handleSubmitChangePermissions = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRolePermissionsMutation.mutate({id: roleId, permissions: newRolePermissions});
    };

    return (
        <>
            <h6>Change permissions</h6>
            <form onSubmit={handleSubmitChangePermissions}>
                <div className="mb-3">
                    {Object.values(Permission).map(permission => (
                        <div className="form-check form-switch" key={permission}>
                            <input className="form-check-input" type="checkbox" id={permission}
                                   checked={newRolePermissions[permission]}
                                   onChange={() => handlePermissionToggle(permission as Permission)}/>
                            <label className="form-check-label" htmlFor={permission}>
                                {permission.replace("_", " ")}
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