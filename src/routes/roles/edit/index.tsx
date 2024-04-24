import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import useRolesApi from "../../../api/roles";
import {Permission} from "../../../enums/permission";
import ErrorMessage from "../../../components/error-message";
import RoleEditPermissionsForm from "./RoleEditPermissionsForm";
import RoleEditNameForm from "./RoleEditNameForm";

export default function RouteRoleEdit() {
    const {id} = useParams();

    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<{ [key in Permission]: boolean }>(
        Object.values(Permission).reduce((acc, permission) => {
            acc[permission] = false;
            return acc;
        }, {} as { [key in Permission]: boolean })
    );

    const rolesApi = useRolesApi();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePermissionToggle = (permission: Permission) => {
        setSelectedPermissions(prevState => ({
            ...prevState,
            [permission]: !prevState[permission]
        }));
    };

    const fetchData = useCallback(async () => {
        const data = await rolesApi.getRolesById(parseInt(id || "-1"));

        setMessage("");

        if (data.error)
            return setMessage(data.message);

        setName(data.name!);

        for (const key in data.permissions)
            setSelectedPermissions(prevState => ({
                ...prevState,
                [key]: data.permissions![key as Permission]
            }));

        // eslint-disable-next-line
    }, [id]);

    const handleSubmitChangePermissions = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container mt-4">

            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={message}/>
                    {!message ?
                        <>
                            <RoleEditNameForm name={name} handleNameChange={handleNameChange}
                                              handleSubmit={handleSubmitChangeName}/>
                            <RoleEditPermissionsForm selectedPermissions={selectedPermissions}
                                                     handlePermissionToggle={handlePermissionToggle}
                                                     handleSubmit={handleSubmitChangePermissions}/>
                        </> : null}
                </div>
            </div>
        </div>
    );
}