import {useEffect, useState} from 'react';

import useUsersApi from "../../api/users";
import ProfileEditPasswordForm from "./ProfileEditPasswordForm";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useUserQueries from "../../hooks/queries/use-user-queries.ts";

export default function RouteProfile() {
    const [userName, setUserName] = useState("");

    const usersApi = useUsersApi();

    const {addToast} = useToastContext();
    const {fetchUserDetails} = useUserQueries(usersApi);

    const data = fetchUserDetails();

    useEffect(() => {
        if (!data) return;

        if (data.error) return addToast(data.code, "error");

        setUserName(data.username!);
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        Username: {userName}
                    </div>
                    <hr/>
                    <ProfileEditPasswordForm usersApi={usersApi}/>
                </div>
            </div>
        </div>
    );
}