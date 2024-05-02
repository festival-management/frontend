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
import ErrorMessage from "../../../components/error-message";
import SuccessMessage from "../../../components/success-message";

export default function RouteUserEdit() {
    const {id} = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRoleId, setNewUserRoleId] = useState("-1");

    const usersApi = useUsersApi();
    const rolesApi = useRolesApi();

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
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
    };
    const updateUserNameMutation = useMutation({
        mutationFn: (variables: {id: number, name: string}) => usersApi.updateUserName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateUserPasswordMutation = useMutation({
        mutationFn: (variables: {id: number, password: string}) => usersApi.updateUserPassword(variables.password, variables.id),
        onSuccess: onSuccessMutation
    });
    const updateUserRoleIdMutation = useMutation({
        mutationFn: (variables: {id: number, roleId: string}) => usersApi.updateUserRoleId(variables.id, variables.roleId),
        onSuccess: onSuccessMutation
    });

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
    }

    const handleAfterTimeoutSaved = () => {
        setIsSaved(false);
    }

    const handleSubmitChangeNewUserName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserNameMutation.mutate({id: parseInt(id || "-1"), name: newUserName});
    };

    const handleSubmitChangeNewUserPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserPasswordMutation.mutate({id: parseInt(id || "-1"), password: newUserPassword});
    };

    const handleSubmitChangeNewUserRoleId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserRoleIdMutation.mutate({id: parseInt(id || "-1"), roleId: newUserRoleId});
    };

    useEffect(() => {
        if (data) {
            if (data.user.error) {
                setHasError(true);
                return setErrorMessage(data.user.message);
            }

            setNewUserName(data.user.username!);
            setNewUserRoleId(data.user.role_id!.toString());

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
                    <SuccessMessage message="Done" visible={isSaved} afterTimeout={handleAfterTimeoutSaved}/>
                    <UserEditNameForm name={newUserName} handleNameChange={handleNewUserNameChange}
                                      handleSubmit={handleSubmitChangeNewUserName}/>
                    <UserEditPasswordForm password={newUserPassword} handlePasswordChange={handleNewUserPasswordChange}
                                          handleSubmit={handleSubmitChangeNewUserPassword}/>
                    <UserEditRoleIdForm rolesName={rolesName} roleId={newUserRoleId}
                                        handleRoleIdChange={handleNewUserRoleIdChange}
                                        handleSubmit={handleSubmitChangeNewUserRoleId}/>
                </div>
            </div>
        </div>
    );
}