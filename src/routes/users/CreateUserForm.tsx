import React, {useEffect, useState} from "react";

import useAuthApi from "../../api/auth.ts";
import useRolesApi from "../../api/roles.ts";
import {User} from "../../models/users.model.ts";
import {RoleName} from "../../models/roles.model.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useRoleQueries from "../../hooks/queries/use-role-queries.ts";
import useAuthMutations from "../../hooks/mutations/use-auth-mutations.ts";

type CreateUserFormProps = {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateUserForm({setUsers, setTotalCount}: CreateUserFormProps) {
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRoleId, setNewUserRoleId] = useState(-1);

    const authApi = useAuthApi();
    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);
    const {addUserMutation} = useAuthMutations(authApi);

    const rolesNameData = fetchRolesName();

    const handleNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(event.target.value);
    };

    const handleNewUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserPassword(event.target.value);
    };

    const handleNewUserRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUserRoleId(parseInt(event.target.value));
    };

    const handleSubmitAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addUserMutation.mutateAsync({
            username: newUserName,
            password: newUserPassword,
            roleId: newUserRoleId
        });

        if (!response.error) {
            setUsers((prevState) => [...prevState, response.user!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewUserName("");
        setNewUserPassword("");
        setNewUserRoleId(-1);
    };

    useEffect(() => {
        if (!rolesNameData) return;

        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    return (
        <form className="mb-3" onSubmit={handleSubmitAddUser}>
            <h6>Create new user</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newUserName" className="form-control" value={newUserName}
                       onChange={handleNewUserNameChange}
                       required/>
                <span className="input-group-text">Password</span>
                <input type="password" id="newUserPassword" className="form-control" value={newUserPassword}
                       onChange={handleNewUserPasswordChange}
                       required/>
                <span className="input-group-text">Role</span>
                <select className="form-select" value={newUserRoleId} onChange={handleNewUserRoleIdChange}
                        id="newUserRoleId">
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