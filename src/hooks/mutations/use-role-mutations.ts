import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {Permission} from "../../enums/permission.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseRolesApiInterface} from "../../models/roles.model.ts";

const useRoleMutations = (rolesApi: UseRolesApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Updates
    const updateRoleNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => rolesApi.updateRoleName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateRolePermissionsMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            permissions: { [permission in Permission]: boolean }
        }) => rolesApi.updateRolePermissions(variables.id, variables.permissions),
        onSuccess: onSuccessMutation
    });
    const updateRolePaperSizeMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            paperSize: string
        }) => rolesApi.updateRolePaperSize(variables.id, variables.paperSize),
        onSuccess: onSuccessMutation
    });

    return {updateRoleNameMutation, updateRolePermissionsMutation, updateRolePaperSizeMutation};
};

export default useRoleMutations;
