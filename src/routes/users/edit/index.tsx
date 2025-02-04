import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import useRolesApi from "../../../api/roles";
import useUsersApi from "../../../api/users";
import UserEditNameForm from "./UserEditNameForm";
import {User} from "../../../models/users.model.ts";
import {RoleName} from "../../../models/roles.model";
import UserEditRoleIdForm from "./UserEditRoleIdForm";
import UserEditPasswordForm from "./UserEditPasswordForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useRoleQueries from "../../../hooks/queries/use-role-queries.ts";
import useUserQueries from "../../../hooks/queries/use-user-queries.ts";

export default function RouteUserEdit() {
    const {id} = useParams();

    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [user, setUser] = useState<User>();

    const usersApi = useUsersApi();
    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);
    const {fetchUserDetails} = useUserQueries(usersApi);

    const rolesNameData = fetchRolesName();
    const userData = fetchUserDetails(parseInt(id || "-1"));

    useEffect(() => {
        if (!rolesNameData) return;

        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    useEffect(() => {
        if (!userData) return;

        if (userData.error) return addToast(userData.code, "error");

        setUser(userData as User);
    }, [userData]);

    if (!user) return;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <UserEditNameForm usersApi={usersApi} userId={user.id} userName={user.username}/>
                    <UserEditPasswordForm usersApi={usersApi} userId={user.id}/>
                    <UserEditRoleIdForm usersApi={usersApi} userId={user.id} userRoleId={user.role_id}
                                        rolesName={rolesName}/>
                </div>
            </div>
        </div>
    );
}