import React, {useEffect, useState} from "react";

import useRolesApi from "../api/roles.ts";
import {RoleName} from "../models/roles.model.ts";
import {useToastContext} from "../contexts/ToastContext.tsx";
import useRoleQueries from "../hooks/queries/use-role-queries.ts";

type EditRolesProps = {
    AddComponent: React.ComponentType<{ rolesName: RoleName[]}>;
    TableComponent: React.ComponentType<{ rolesName: RoleName[]}>;
};

export default function EditRoles({AddComponent, TableComponent}: EditRolesProps) {
    const [rolesName, setRolesName] = useState<RoleName[]>([]);

    const rolesApi = useRolesApi();

    const { addToast } = useToastContext();
    const { fetchRolesName } = useRoleQueries(rolesApi);

    const rolesNameData = fetchRolesName(true);

    useEffect(() => {
        if (!rolesNameData) return;
        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    return (
        <>
            <AddComponent rolesName={rolesName}/>
            <TableComponent rolesName={rolesName}/>
        </>
    );
}