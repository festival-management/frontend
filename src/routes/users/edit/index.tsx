import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import useUsersApi from "../../../api/users";
import UserEditNameForm from "./UserEditNameForm";
import {User} from "../../../models/users.model.ts";
import UserEditRoleIdForm from "./UserEditRoleIdForm";
import UserEditPasswordForm from "./UserEditPasswordForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useUserQueries from "../../../hooks/queries/use-user-queries.ts";

export default function RouteUserEdit() {
    const {id} = useParams();

    const [user, setUser] = useState<User>();

    const usersApi = useUsersApi();

    const {addToast} = useToastContext();
    const {fetchUserDetails} = useUserQueries(usersApi);

    const userData = fetchUserDetails(parseInt(id || "-1"));

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
                    <UserEditRoleIdForm usersApi={usersApi} userId={user.id} userRoleId={user.role_id}/>
                </div>
            </div>
        </div>
    );
}