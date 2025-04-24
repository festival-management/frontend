import React from "react";

import {useRoleEditContext} from "../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../hooks/mutations/use-role-mutations.ts";

export default function RoleEditNameForm() {
    const {roleId, roleName, setRoleName, rolesApi} = useRoleEditContext();

    const {updateRoleNameMutation} = useRoleMutations(rolesApi);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(event.target.value);
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRoleNameMutation.mutate({id: roleId, name: roleName});
    };

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
                        value={roleName}
                        onChange={handleNameChange}
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