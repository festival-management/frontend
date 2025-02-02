import {useEffect, useState} from 'react';

import RolesTable from "./RolesTable";
import useRolesApi from "../../api/roles";
import CreateRoleForm from "./CreateRoleForm";
import {Role} from "../../models/roles.model";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useRoleQueries from "../../hooks/queries/use-role-queries.ts";
import PaginationControls from "../../components/pagination-controls";

export default function RouteRoles() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);

    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {fetchRolesData} = useRoleQueries(rolesApi);

    const rolesData = fetchRolesData(page);

    useEffect(() => {
        if (!rolesData) return;

        if (rolesData.error) return addToast(rolesData.code, "error");

        setRoles(rolesData.roles!);
        setTotalCount(rolesData.total_count!);
    }, [rolesData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateRoleForm rolesApi={rolesApi} setRoles={setRoles} setTotalCount={setTotalCount}/>
                    <RolesTable rolesApi={rolesApi} roles={roles} setRoles={setRoles} setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}