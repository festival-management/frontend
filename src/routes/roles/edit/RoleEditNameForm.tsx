import React, {useEffect, useState} from "react";

import {UseRolesApiInterface} from "../../../models/roles.model.ts";
import useRoleMutations from "../../../hooks/mutations/use-role-mutations.ts";

type RoleEditNameFormProps = {
    rolesApi: UseRolesApiInterface;
    roleId: number;
    roleName: string;
}

export default function RoleEditNameForm({rolesApi, roleId, roleName}: RoleEditNameFormProps) {
    const [newRoleName, setNewRoleName] = useState(roleName);

    const {updateRoleNameMutation} = useRoleMutations(rolesApi);

    const handleNewRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleName(event.target.value);
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRoleNameMutation.mutate({id: roleId, name: newRoleName});
    };

    useEffect(() => {
        setNewRoleName(roleName);
    }, [roleName]);

    return (
        <>
            <h6>Change name</h6>
            <form onSubmit={handleSubmitChangeName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputName"
                        placeholder="Input the name of role"
                        value={newRoleName}
                        onChange={handleNewRoleNameChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}