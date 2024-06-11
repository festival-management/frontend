import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import useRolesApi from "../../../api/roles";
import useUsersApi from "../../../api/users";
import UserEditNameForm from "./UserEditNameForm";
import {RoleName} from "../../../models/roles.model";
import BaseResponse from "../../../models/base.model";
import UserEditRoleIdForm from "./UserEditRoleIdForm";
import UserEditPasswordForm from "./UserEditPasswordForm";
import ToastManager from "../../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";

export default function RouteUserEdit() {
    const {id} = useParams();

    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRoleId, setUserRoleId] = useState(-1);

    const usersApi = useUsersApi();
    const rolesApi = useRolesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["users-edit", id],
        queryFn: async () => {
            const data = await usersApi.getUserById(parseInt(id || "-1"));
            const dataRolesName = await rolesApi.getRolesName();

            return {user: data, rolesName: dataRolesName};
        },
        enabled: true,
        staleTime: 0,
    });
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            return addToast(data.message, "error");
        }

        addToast("Done", "success");
    };
    const updateUserNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => usersApi.updateUserName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateUserPasswordMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            password: string
        }) => usersApi.updateUserPassword(variables.password, variables.id),
        onSuccess: onSuccessMutation
    });
    const updateUserRoleIdMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            roleId: number
        }) => usersApi.updateUserRoleId(variables.id, variables.roleId),
        onSuccess: onSuccessMutation
    });

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(event.target.value);
    };

    const handleUserRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserRoleId(parseInt(event.target.value));
    };

    const handleSubmitChangeNewUserName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserNameMutation.mutate({id: parseInt(id || "-1"), name: userName});
    };

    const handleSubmitChangeNewUserPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserPasswordMutation.mutate({id: parseInt(id || "-1"), password: userPassword});
    };

    const handleSubmitChangeNewUserRoleId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserRoleIdMutation.mutate({id: parseInt(id || "-1"), roleId: userRoleId});
    };

    useEffect(() => {
        if (data) {
            if (data.user.error) {
                return addToast(data.user.message, "error");
            }

            setUserName(data.user.username!);
            setUserRoleId(data.user.role_id!);

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
                    <UserEditNameForm name={userName} handleNameChange={handleUserNameChange}
                                      handleSubmit={handleSubmitChangeNewUserName}/>
                    <UserEditPasswordForm password={userPassword} handlePasswordChange={handleUserPasswordChange}
                                          handleSubmit={handleSubmitChangeNewUserPassword}/>
                    <UserEditRoleIdForm rolesName={rolesName} roleId={userRoleId}
                                        handleRoleIdChange={handleUserRoleIdChange}
                                        handleSubmit={handleSubmitChangeNewUserRoleId}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}