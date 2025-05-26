import {useEffect} from 'react';
import {useParams} from "react-router-dom";

import RoleEditPrinters from "./printers";
import RoleEditNameForm from "./RoleEditNameForm";
import {Permission} from "../../../enums/permission.ts";
import RoleEditPermissionsForm from "./RoleEditPermissionsForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useRoleQueries from "../../../hooks/queries/use-role-queries.ts";
import {useRoleEditContext} from "../../../contexts/RoleEditContext.tsx";
import RoleEditOrderConfirmerForm from "./RoleEditOrderConfirmerForm.tsx";

export default function RouteRoleEdit() {
    const {id} = useParams();

    const {addToast} = useToastContext();
    const {
        setRoleId,
        setRoleName,
        setRolePermissions,
        setRolePrinters,
        setRoleOrderConfirmerId,
        rolesApi
    } = useRoleEditContext();
    const {fetchRoleDetails} = useRoleQueries(rolesApi);

    const roleData = fetchRoleDetails(parseInt(id || "-1"), true, true);

    useEffect(() => {
        if (!roleData) return;

        if (roleData.error) return addToast(roleData.code, "error");

        setRoleId(roleData.id!);
        setRoleName(roleData.name!);
        setRolePermissions(
            new Map<Permission, boolean>(
                Object.entries(roleData.permissions!).map(([key, value]) => [
                    Object.values(Permission).find(p => p === key)!,
                    value
                ])
            )
        );
        setRolePrinters(roleData.printers || []);
        setRoleOrderConfirmerId(roleData.order_confirmer?.id || -1);
    }, [roleData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <RoleEditNameForm/>
                    <RoleEditPermissionsForm/>
                    <RoleEditPrinters/>
                    <RoleEditOrderConfirmerForm/>
                </div>
            </div>
        </div>
    );
}