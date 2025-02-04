import {useEffect, useState} from 'react';

import UsersTable from "./UsersTable";
import useUsersApi from "../../api/users";
import CreateUserForm from "./CreateUserForm";
import {User} from "../../models/users.model";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import PaginationControls from "../../components/pagination-controls";
import useUserQueries from "../../hooks/queries/use-user-queries.ts";

export default function RouteUsers() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);

    const usersApi = useUsersApi();

    const {addToast} = useToastContext();
    const {fetchUsersData} = useUserQueries(usersApi);

    const usersData = fetchUsersData(page);

    useEffect(() => {
        if (!usersData) return;

        if (usersData.error) return addToast(usersData.code, "error");

        setUsers(usersData.users!);
        setTotalCount(usersData.total_count!);
    }, [usersData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateUserForm setUsers={setUsers} setTotalCount={setTotalCount}/>
                    <UsersTable users={users} setUsers={setUsers} setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}