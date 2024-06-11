import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

import RolesTable from "./RolesTable";
import useRolesApi from "../../api/roles";
import CreateRoleForm from "./CreateRoleForm";
import {Role} from "../../models/roles.model";
import ToastManager from "../../components/toast-manager.tsx";
import PaginationControls from "../../components/pagination-controls";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";


export default function RouteRoles() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRoleName, setNewRoleName] = useState("");

    const rolesApi = useRolesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["roles", page],
        queryFn: () => rolesApi.getRoles(page),
        enabled: true,
        staleTime: 0,
    });
    const addRoleMutation = useMutation({
        mutationFn: rolesApi.addRole,
        onSuccess: async (data) => {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setNewRoleName("");

            setRoles((prevState) => [...prevState, data.role!]);
        }
    });
    const deleteRoleMutation = useMutation({
        mutationFn: rolesApi.deleteRole,
        onSuccess: async (data, variables) => {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setRoles((prevState) => prevState.filter((role) => role.id !== variables));
        }
    });

    const handleNewRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleName(event.target.value);
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addRoleMutation.mutate(newRoleName);
    }

    const handleDeleteRole = async (id: number) => {
        deleteRoleMutation.mutate(id);
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setRoles(data.roles!);
            setTotalCount(data.total_count!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateRoleForm name={newRoleName} handleNameChange={handleNewRoleNameChange}
                                    handleSubmit={handleSubmitAddRole}/>
                    <RolesTable data={roles} handlerDeleteRole={handleDeleteRole}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}