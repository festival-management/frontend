import React, {useCallback, useEffect, useState} from 'react';

import UsersTable from "./UsersTable";
import useUsersApi from "../../api/users";
import useRolesApi from "../../api/roles";
import {RoleName} from "../../models/roles.model";
import {User} from "../../models/users.model";
import ErrorMessage from "../../components/error-message";
import PaginationControls from "../../components/pagination-controls";
import CreateUserForm from "./CreateUserForm";

export default function RouteUsers() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRoleId, setNewUserRoleId] = useState("-1");

    const rolesApi = useRolesApi();
    const usersApi = useUsersApi();

    const handleNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(event.target.value);
    };

    const handleNewUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserPassword(event.target.value);
    };

    const handleNewUserRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUserRoleId(event.target.value);
    };

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

        const dataRolesName = await rolesApi.getRolesName();

        if (dataRolesName.error) {
            setHasError(true);
            return setErrorMessage(dataRolesName.message);
        }

        setRolesName(dataRolesName.roles!);

        // eslint-disable-next-line
    }, [page]);

    const handleSubmitAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleDeleteUser = async (id: number) => {
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <CreateUserForm name={newUserName} handleNameChange={handleNewUserNameChange}
                                    password={newUserPassword} handlePasswordChange={handleNewUserPasswordChange}
                                    roleId={newUserRoleId} handleRoleIdChange={handleNewUserRoleIdChange}
                                    rolesName={rolesName} handleSubmit={handleSubmitAddUser}/>
                    <UsersTable data={users} handlerDeleteUser={handleDeleteUser}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}