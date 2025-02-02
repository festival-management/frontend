import {useEffect, useState} from "react";

import useRolesApi from "../../../../api/roles.ts";
import {RoleName} from "../../../../models/roles.model.ts";
import ProductEditRolesAdd from "./ProductEditRolesAdd.tsx";
import ProductEditRolesTable from "./ProductEditRolesTable.tsx";
import {useToastContext} from "../../../../contexts/ToastContext.tsx";
import useRoleQueries from "../../../../hooks/queries/use-role-queries.ts";

export default function ProductEditRoles() {
    const [rolesName, setRolesName] = useState<RoleName[]>([]);

    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);

    const rolesNameData = fetchRolesName(true);

    useEffect(() => {
        if (!rolesNameData) return;

        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <ProductEditRolesAdd rolesName={rolesName}/>
            <ProductEditRolesTable rolesName={rolesName}/>
            <hr/>
        </>
    );
}