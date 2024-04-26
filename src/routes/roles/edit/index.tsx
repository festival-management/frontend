import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import useRolesApi from "../../../api/roles";
import RoleEditNameForm from "./RoleEditNameForm";
import {PaperSize} from "../../../enums/paper-size";
import {Permission} from "../../../enums/permission";
import RoleEditPaperSizeForm from "./RoleEditPaperSizeForm";
import ErrorMessage from "../../../components/error-message";
import RoleEditPermissionsForm from "./RoleEditPermissionsForm";
import SuccessMessage from "../../../components/success-message";

export default function RouteRoleEdit() {
    const {id} = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [rolePermissions, setRolePermissions] = useState<{ [key in Permission]: boolean }>(
        Object.values(Permission).reduce((acc, permission) => {
            acc[permission] = false;
            return acc;
        }, {} as { [key in Permission]: boolean })
    );
    const [rolePaperSize, setRolePaperSize] = useState("");

    const rolesApi = useRolesApi();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(event.target.value);
    };

    const handlePermissionToggle = (permission: Permission) => {
        setRolePermissions(prevState => ({
            ...prevState,
            [permission]: !prevState[permission]
        }));
    };

    const handlePaperSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRolePaperSize(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    }

    const handleAfterTimeoutSaved = () => {
        setIsSaved(false);
    }

    const fetchData = useCallback(async () => {
        const data = await rolesApi.getRolesById(parseInt(id || "-1"));

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setRoleName(data.name!);
        setRolePaperSize(data.paper_size || PaperSize.A4);

        for (const key in data.permissions)
            setRolePermissions(prevState => ({
                ...prevState,
                [key]: data.permissions![key as Permission]
            }));

        // eslint-disable-next-line
    }, [id]);

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await rolesApi.updateRoleName(parseInt(id || "-1"), roleName);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
    };

    const handleSubmitChangePermissions = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await rolesApi.updateRolePermissions(parseInt(id || "-1"), rolePermissions);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
    };

    const handleSubmitChangePaperSize = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await rolesApi.updateRolePaperSize(parseInt(id || "-1"), rolePaperSize);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
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
                    <RoleEditNameForm name={roleName} handleNameChange={handleNameChange}
                                      handleSubmit={handleSubmitChangeName}/>
                    <RoleEditPermissionsForm selectedPermissions={rolePermissions}
                                             handlePermissionToggle={handlePermissionToggle}
                                             handleSubmit={handleSubmitChangePermissions}/>
                    <RoleEditPaperSizeForm paperSize={rolePaperSize} handlePaperSizeChange={handlePaperSizeChange}
                                           handleSubmit={handleSubmitChangePaperSize}/>

                </div>
            </div>
        </div>
    );
}