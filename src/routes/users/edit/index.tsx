import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import useRolesApi from "../../../api/roles";
import useUsersApi from "../../../api/users";
import {RoleName} from "../../../models/roles.model";
import ErrorMessage from "../../../components/error-message";
import SuccessMessage from "../../../components/success-message";
import UserEditNameForm from "./UserEditNameForm";
import UserEditPasswordForm from "./UserEditPasswordForm";
import UserEditRoleIdForm from "./UserEditRoleIdForm";

export default function RouteUserEdit() {
    const {id} = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
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
    }

    const handleAfterTimeoutSaved = () => {
        setIsSaved(false);
    }

    const fetchData = useCallback(async () => {
        const data = await usersApi.getUserById(parseInt(id || "-1"));

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setNewUserName(data.username!);
        setNewUserRoleId(data.role_id!.toString());

        const dataRolesName = await rolesApi.getRolesName();

        if (dataRolesName.error) {
            setHasError(true);
            return setErrorMessage(dataRolesName.message);
        }

        setRolesName(dataRolesName.roles!);

        // eslint-disable-next-line
    }, []);

    const handleSubmitChangeNewUserName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await usersApi.updateUserName(parseInt(id || "-1"), newUserName);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
    };

    const handleSubmitChangeNewUserPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await usersApi.updateUserPassword(parseInt(id || "-1"), newUserPassword);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
    };

    const handleSubmitChangeNewUserRoleId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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