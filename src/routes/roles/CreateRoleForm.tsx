import React, {useState} from "react";

import {Role, UseRolesApiInterface} from "../../models/roles.model.ts";
import useRoleMutations from "../../hooks/mutations/use-role-mutations.ts";

type CreateRoleFormProps = {
    rolesApi: UseRolesApiInterface;
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateRoleForm({rolesApi, setRoles, setTotalCount}: CreateRoleFormProps) {
    const [newRoleName, setNewRoleName] = useState("");

    const {addRoleMutation} = useRoleMutations(rolesApi);

    const handleNewRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleName(event.target.value);
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addRoleMutation.mutateAsync(newRoleName);

        if (!response.error) {
            setRoles((prevState) => [...prevState, response.role!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewRoleName("");
    }

    return (
        <form className="mb-3" onSubmit={handleSubmitAddRole}>
            <h6>Create new role</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newRoleName" className="form-control" value={newRoleName}
                       onChange={handleNewRoleNameChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}