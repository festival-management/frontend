import React, {useCallback, useEffect, useState} from 'react';

import UsersTable from "./UsersTable";
import useUsersApi from "../../api/users";
import {User} from "../../models/users.model";
import ErrorMessage from "../../components/error-message";
import PaginationControls from "../../components/pagination-controls";

export default function RouteUsers() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);

    const usersApi = useUsersApi();

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    };

    const fetchData = useCallback(async () => {
        const data = await usersApi.getUsers(page);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setUsers(data.users!);
        setTotalCount(data.total_count!);

        // eslint-disable-next-line
    }, [page]);

    const handleDeleteUser = async (id: number) => {
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <UsersTable data={users} handlerDeleteUser={handleDeleteUser}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}