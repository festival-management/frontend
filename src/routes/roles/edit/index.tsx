import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import useRolesApi from "../../../api/roles";
import RoleEditNameForm from "./RoleEditNameForm";
import {Role} from "../../../models/roles.model.ts";
import RoleEditPaperSizeForm from "./RoleEditPaperSizeForm";
import RoleEditPermissionsForm from "./RoleEditPermissionsForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useRoleQueries from "../../../hooks/queries/use-role-queries.ts";

export default function RouteRoleEdit() {
    const {id} = useParams();

    const [role, setRole] = useState<Role>();

    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {fetchRoleDetails} = useRoleQueries(rolesApi);

    const roleData = fetchRoleDetails(parseInt(id || "-1"));

    useEffect(() => {
        if (!roleData) return;

        if (roleData.error) return addToast(roleData.code, "error");

        setRole(roleData as Role);
    }, [roleData]);

    if (!role) return;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <RoleEditNameForm rolesApi={rolesApi} roleId={role.id} roleName={role.name}/>
                    <RoleEditPermissionsForm rolesApi={rolesApi} roleId={role.id} rolePermissions={role.permissions}/>
                    <RoleEditPaperSizeForm rolesApi={rolesApi} roleId={role.id} rolePaperSize={role.paper_size}/>
                </div>
            </div>
        </div>
    );
}