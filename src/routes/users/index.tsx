import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

import UsersTable from "./UsersTable";
import useAuthApi from "../../api/auth";
import useUsersApi from "../../api/users";
import useRolesApi from "../../api/roles";
import CreateUserForm from "./CreateUserForm";
import {RoleName} from "../../models/roles.model";
import {User} from "../../models/users.model";
import ErrorMessage from "../../components/error-message";
import PaginationControls from "../../components/pagination-controls";

export default function RouteUsers() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRoleId, setNewUserRoleId] = useState(-1);

    const authApi = useAuthApi();
    const rolesApi = useRolesApi();
    const usersApi = useUsersApi();

    const {data} = useQuery({
        queryKey: ["users", page],
        queryFn: async () => {
            const data = await usersApi.getUsers(page);
            const dataRolesName = await rolesApi.getRolesName();

            return {users: data, rolesName: dataRolesName};
        },
        enabled: true,
        staleTime: 0,
    });
    const addUserMutation = useMutation({
        mutationFn: (variables: {
            username: string,
            password: string,
            roleId: number
        }) => authApi.register(variables.username, variables.password, variables.roleId),
        onSuccess: async (data) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setNewUserName("");
            setNewUserPassword("");
            setNewUserRoleId(-1);

            setUsers((prevState) => [...prevState, data.user!]);
        }
    });
    const deleteUserMutation = useMutation({
        mutationFn: usersApi.deleteUser,
        onSuccess: async (data, variables) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setUsers((prevState) => prevState.filter((user) => user.id !== variables));
        }
    });

    const handleNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(event.target.value);
    };

    const handleNewUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserPassword(event.target.value);
    };

    const handleNewUserRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewUserRoleId(parseInt(event.target.value));
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    };

    const handleSubmitAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addUserMutation.mutate({username: newUserName, password: newUserPassword, roleId: newUserRoleId});
    };

    const handleDeleteUser = async (id: number) => {
        deleteUserMutation.mutate(id);
    };

    useEffect(() => {
        if (data) {
            if (data.users.error) {
                setHasError(true);
                return setErrorMessage(data.users.message);
            }

            setUsers(data.users.users!);
            setTotalCount(data.users.total_count!);

            if (data.rolesName.error) {
                setHasError(true);
                return setErrorMessage(data.rolesName.message);
            }

            setRolesName(data.rolesName.roles!);
        }
    }, [data]);

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