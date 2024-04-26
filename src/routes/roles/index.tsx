import React, {useCallback, useEffect, useState} from 'react';

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

    const handleNewRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleName(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    }

    const fetchData = useCallback(async () => {
        const data = await rolesApi.getRoles(page);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setRoles(data.roles!);
        setTotalCount(data.total_count!);

        // eslint-disable-next-line
    }, [page]);

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resp = await rolesApi.addRole(newRoleName);

        if (resp.error) {
            setHasError(true);
            return setErrorMessage(resp.message);
        }

        setNewRoleName("");

        await fetchData();
    }

    const handleDeleteRole = async (id: number) => {
        const resp = await rolesApi.deleteRole(id);

        if (resp.error) {
            setHasError(true);
            return setErrorMessage(resp.message);
        }

        await fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <CreateRoleForm name={newRoleName} handleNameChange={handleNewRoleNameChange} handleSubmit={handleSubmitAddRole}/>
                    <RolesTable data={roles} handlerDeleteRole={handleDeleteRole}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}