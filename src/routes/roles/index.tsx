import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

import RolesTable from "./RolesTable";
import useRolesApi from "../../api/roles";
import CreateRoleForm from "./CreateRoleForm";
import {Role} from "../../models/roles.model";
import ErrorMessage from "../../components/error-message";
import PaginationControls from "../../components/pagination-controls";


export default function RouteRoles() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRoleName, setNewRoleName] = useState("");

    const rolesApi = useRolesApi();

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
                setHasError(true);
                setErrorMessage(data.message);
                return;
            }

            setNewRoleName("");

            setRoles((prevState) => [...prevState, data.role!]);
        }
    });
    const deleteRoleMutation = useMutation({
        mutationFn: rolesApi.deleteRole,
        onSuccess: async (data, variables) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setRoles((prevState) => prevState.filter((role) => role.id !== variables));
        }
    });

    const handleNewRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleName(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    }

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
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setRoles(data.roles!);
            setTotalCount(data.total_count!);
        }
    }, [data]);


    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <CreateRoleForm name={newRoleName} handleNameChange={handleNewRoleNameChange}
                                    handleSubmit={handleSubmitAddRole}/>
                    <RolesTable data={roles} handlerDeleteRole={handleDeleteRole}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}