import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {Permission} from "../../enums/permission.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseRolesApiInterface} from "../../models/roles.model.ts";

const useRoleMutations = (rolesApi: UseRolesApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addRoleMutation = useMutation({
        mutationFn: rolesApi.addRole,
        onSuccess: onSuccessMutation
    });

    // Updates
    const updateRoleNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => rolesApi.updateRoleName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateRolePermissionsMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            permissions: Map<Permission, boolean>
        }) => rolesApi.updateRolePermissions(variables.id, variables.permissions),
        onSuccess: onSuccessMutation
    });
    const updateRoleOrderConfirmerMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            orderConfirmerId: number
        }) => rolesApi.updateRoleOrderConfirmer(variables.id, variables.orderConfirmerId),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteRoleMutation = useMutation({
        mutationFn: rolesApi.deleteRole,
        onSuccess: onSuccessMutation
    });

    // Printers
    const addRolePrinterMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            printerId: number,
            printerType: string
        }) => rolesApi.addRolePrinter(variables.id, variables.printerId, variables.printerType),
        onSuccess: onSuccessMutation
    });
    const deleteRolePrinterMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            rolePrinterId: number
        }) => rolesApi.deleteRolePrinter(variables.id, variables.rolePrinterId),
        onSuccess: onSuccessMutation
    });

    return {
        addRoleMutation,
        updateRoleNameMutation,
        updateRolePermissionsMutation,
        updateRoleOrderConfirmerMutation,
        deleteRoleMutation,
        addRolePrinterMutation,
        deleteRolePrinterMutation,
    };
};

export default useRoleMutations;
