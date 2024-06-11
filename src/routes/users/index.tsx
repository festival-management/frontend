import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

import UsersTable from "./UsersTable";
import useAuthApi from "../../api/auth";
import useUsersApi from "../../api/users";
import useRolesApi from "../../api/roles";
import CreateUserForm from "./CreateUserForm";
import {User} from "../../models/users.model";
import {RoleName} from "../../models/roles.model";
import ToastManager from "../../components/toast-manager.tsx";
import PaginationControls from "../../components/pagination-controls";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";

export default function RouteUsers() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
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

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

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
                return addToast(data.message, "error");
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
                return addToast(data.message, "error");
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
                return addToast(data.users.message, "error");
            }

            setUsers(data.users.users!);
            setTotalCount(data.users.total_count!);

            if (data.rolesName.error) {
                return addToast(data.rolesName.message, "error");
            }

            setRolesName(data.rolesName.roles!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateUserForm name={newUserName} handleNameChange={handleNewUserNameChange}
                                    password={newUserPassword} handlePasswordChange={handleNewUserPasswordChange}
                                    roleId={newUserRoleId} handleRoleIdChange={handleNewUserRoleIdChange}
                                    rolesName={rolesName} handleSubmit={handleSubmitAddUser}/>
                    <UsersTable data={users} handlerDeleteUser={handleDeleteUser}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}