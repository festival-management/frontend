import React, {useEffect, useState} from "react";

import {RoleName} from "../../../models/roles.model.ts";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useRoleQueries from "../../../hooks/queries/use-role-queries.ts";
import {useRoleEditContext} from "../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../hooks/mutations/use-role-mutations.ts";

export default function RoleEditOrderConfirmerForm() {
    const [rolesName, setRolesName] = useState<RoleName[]>([]);

    const {addToast} = useToastContext();
    const {
        roleId,
        roleOrderConfirmerId,
        setRoleOrderConfirmerId,
        rolesApi
    } = useRoleEditContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);
    const {updateRoleOrderConfirmerMutation} = useRoleMutations(rolesApi);

    const rolesNameData = fetchRolesName(undefined, true);

    const handleRoleOrderConfirmerIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRoleOrderConfirmerId(parseInt(event.target.value));
    };

    const handleSubmitChangeRoleOrderConfirmerId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRoleOrderConfirmerMutation.mutate({id: roleId, orderConfirmerId: roleOrderConfirmerId});
    };

    useEffect(() => {
        if (!rolesNameData) return;

        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    return (
        <>
            <h6>Change Order Confirmer</h6>
            <form onSubmit={handleSubmitChangeRoleOrderConfirmerId}>
                <div className="mb-3">
                    <select id="formInputRoleOrderConfirmer" className="form-select" value={roleOrderConfirmerId}
                            onChange={handleRoleOrderConfirmerIdChange}>
                        <option value="-1">Open this select menu</option>
                        {rolesName.map((e) => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    )
}