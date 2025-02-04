import React, {useEffect, useState} from "react";

import useRolesApi from "../../../api/roles.ts";
import {RoleName} from "../../../models/roles.model";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import {UseUsersApiInterface} from "../../../models/users.model.ts";
import useRoleQueries from "../../../hooks/queries/use-role-queries.ts";
import useUserMutations from "../../../hooks/mutations/use-user-mutations.ts";

type UserEditRoleIdFormProps = {
    usersApi: UseUsersApiInterface;
    userId: number;
    userRoleId: number;
}

export default function UserEditRoleIdForm({usersApi, userId, userRoleId}: UserEditRoleIdFormProps) {
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [newUserRoleId, setNewUserRoleId] = useState(userRoleId);

    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);
    const {updateUserRoleIdMutation} = useUserMutations(usersApi);

    const rolesNameData = fetchRolesName();

    const handleUserRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUserRoleId(parseInt(event.target.value));
    };

    const handleSubmitChangeNewUserRoleId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserRoleIdMutation.mutate({id: userId, roleId: newUserRoleId});
    };

    useEffect(() => {
        if (!rolesNameData) return;

        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    useEffect(() => {
        setNewUserRoleId(userRoleId);
    }, [userRoleId]);

    return (
        <>
            <h6>Change role</h6>
            <form onSubmit={handleSubmitChangeNewUserRoleId}>
                <div className="mb-3">
                    <select id="formInputUserRole" className="form-select" value={newUserRoleId}
                            onChange={handleUserRoleIdChange}>
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