import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import useRolesApi from "../../../api/roles";
import RoleEditNameForm from "./RoleEditNameForm";
import {PaperSize} from "../../../enums/paper-size";
import {Permission} from "../../../enums/permission";
import BaseResponse from "../../../models/base.model";
import {ErrorCodes} from "../../../errors/ErrorCodes.ts";
import RoleEditPaperSizeForm from "./RoleEditPaperSizeForm";
import RoleEditPermissionsForm from "./RoleEditPermissionsForm";
import ToastManager from "../../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";

export default function RouteRoleEdit() {
    const {id} = useParams();

    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [roleName, setRoleName] = useState("");
    const [rolePermissions, setRolePermissions] = useState<{ [key in Permission]: boolean }>(
        Object.values(Permission).reduce((acc, permission) => {
            acc[permission] = false;
            return acc;
        }, {} as { [key in Permission]: boolean })
    );
    const [rolePaperSize, setRolePaperSize] = useState("");

    const rolesApi = useRolesApi();

    const addToast = (errorCode: number, type: ToastType) => {
        setToasts((prevToasts) => [{ errorCode, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["roles-edit", id],
        queryFn: () => rolesApi.getRolesById(parseInt(id || "-1")),
        enabled: true,
        staleTime: 0,
    });
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            return addToast(data.code, "error");
        }

        addToast(ErrorCodes.SUCCESS, "success");
    };
    const updateRoleNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => rolesApi.updateRoleName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateRolePermissionsMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            permissions: { [permission in Permission]: boolean }
        }) => rolesApi.updateRolePermissions(variables.id, variables.permissions),
        onSuccess: onSuccessMutation
    });
    const updateRolePaperSizeMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            paperSize: string
        }) => rolesApi.updateRolePaperSize(variables.id, variables.paperSize),
        onSuccess: onSuccessMutation
    });

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

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRoleNameMutation.mutate({id: parseInt(id || "-1"), name: roleName});
    };

    const handleSubmitChangePermissions = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRolePermissionsMutation.mutate({id: parseInt(id || "-1"), permissions: rolePermissions});
    };

    const handleSubmitChangePaperSize = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRolePaperSizeMutation.mutate({id: parseInt(id || "-1"), paperSize: rolePaperSize});
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                return addToast(data.code, "error");
            }

            setRoleName(data.name!);
            setRolePaperSize(data.paper_size || PaperSize.UNDEFINED);

            for (const key in data.permissions)
                setRolePermissions(prevState => ({
                    ...prevState,
                    [key]: data.permissions![key as Permission]
                }));
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <RoleEditNameForm name={roleName} handleNameChange={handleNameChange}
                                      handleSubmit={handleSubmitChangeName}/>
                    <RoleEditPermissionsForm selectedPermissions={rolePermissions}
                                             handlePermissionToggle={handlePermissionToggle}
                                             handleSubmit={handleSubmitChangePermissions}/>
                    <RoleEditPaperSizeForm paperSize={rolePaperSize} handlePaperSizeChange={handlePaperSizeChange}
                                           handleSubmit={handleSubmitChangePaperSize}/>

                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}