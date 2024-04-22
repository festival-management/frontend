import React, {useCallback, useEffect, useState} from 'react';

import RolesTable from "./RolesTable";
import useRolesApi from "../../api/roles";
import {Role} from "../../models/roles.model";
import ErrorMessage from "../../components/error-message";
import PaginationControls from "../../components/pagination-controls";

export default function RouteRoles() {
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);

    const rolesApi = useRolesApi();

    const fetchData = useCallback(async () => {
        const data = await rolesApi.getRoles(page);

        if (data.error)
            return setMessage(data.message);

        setRoles(data.roles!);
        setTotalCount(data.total_count!);

        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="container mt-4">
            <ErrorMessage message={message}/>
            <RolesTable data={roles}/>
            <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
        </div>
    );
}