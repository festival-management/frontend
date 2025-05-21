import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseMenusApiInterface} from "../../models/menus.model.ts";

const useMenuMutations = (menusApi: UseMenusApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addMenuMutation = useMutation({
        mutationFn: (variables: {
            name: string,
            shortName: string,
            price: number,
        }) => menusApi.addMenu(variables.name, variables.shortName, variables.price),
        onSuccess: onSuccessMutation
    });

    // Updates
    const updateMenuNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => menusApi.updateMenuName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateMenuShortNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            shortName: string
        }) => menusApi.updateMenuShortName(variables.id, variables.shortName),
        onSuccess: onSuccessMutation
    });
    const updateMenuPriceMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            price: number
        }) => menusApi.updateMenuPrice(variables.id, variables.price),
        onSuccess: onSuccessMutation
    });
    const updateMenuDailyMaxSalesMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            dailyMaxSales: number | null
        }) => menusApi.updateMenuDailyMaxSales(variables.id, variables.dailyMaxSales),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            name: string
        }) => menusApi.updateMenuFieldName(variables.id, variables.menuFieldId, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldIsOptionalMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            isOptional: boolean
        }) => menusApi.updateMenuFieldIsOptional(variables.id, variables.menuFieldId, variables.isOptional),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldMaxSortableElementsMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            maxSortableElements: number
        }) => menusApi.updateMenuFieldMaxSortableElements(variables.id, variables.menuFieldId, variables.maxSortableElements),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldAdditionalCostMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            additionalCost: number
        }) => menusApi.updateMenuFieldAdditionalCost(variables.id, variables.menuFieldId, variables.additionalCost),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldCanExceedMaxSortableMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            canExceedMaxSortable: boolean
        }) => menusApi.updateMenuFieldCanExceedMaxSortable(variables.id, variables.menuFieldId, variables.canExceedMaxSortable),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteMenuMutation = useMutation({
        mutationFn: menusApi.deleteMenu,
        onSuccess: onSuccessMutation
    });

    // Dates
    const addMenuDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            startDate: string,
            endDate: string
        }) => menusApi.addMenuDate(variables.id, variables.startDate, variables.endDate),
        onSuccess: onSuccessMutation
    });
    const deleteMenuDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuDateId: number
        }) => menusApi.deleteMenuDate(variables.id, variables.menuDateId),
        onSuccess: onSuccessMutation
    });

    // Fields
    const addMenuFieldMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string,
            maxSortableElements: number,
            additionalCoast: number
        }) => menusApi.addMenuField(variables.id, variables.name, variables.maxSortableElements, variables.additionalCoast),
        onSuccess: onSuccessMutation
    });
    const addMenuFieldProductMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            price: number,
            productId: number
        }) => menusApi.addMenuFieldProduct(variables.id, variables.menuFieldId, variables.price, variables.productId),
        onSuccess: onSuccessMutation
    });
    const deleteMenuFieldMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number
        }) => menusApi.deleteMenuField(variables.id, variables.menuFieldId),
        onSuccess: onSuccessMutation
    });
    const deleteMenuFieldProductMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            menuFieldProductId: number
        }) => menusApi.deleteMenuFieldProduct(variables.id, variables.menuFieldId, variables.menuFieldProductId),
        onSuccess: onSuccessMutation
    });

    // Roles
    const addMenuRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            roleId: number
        }) => menusApi.addMenuRole(variables.id, variables.roleId),
        onSuccess: onSuccessMutation
    });
    const deleteMenuRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuRoleId: number
        }) => menusApi.deleteMenuRole(variables.id, variables.menuRoleId),
        onSuccess: onSuccessMutation
    });

    return {
        addMenuMutation,
        updateMenuNameMutation,
        updateMenuShortNameMutation,
        updateMenuPriceMutation,
        updateMenuDailyMaxSalesMutation,
        updateMenuFieldNameMutation,
        updateMenuFieldIsOptionalMutation,
        updateMenuFieldMaxSortableElementsMutation,
        updateMenuFieldAdditionalCostMutation,
        updateMenuFieldCanExceedMaxSortableMutation,
        deleteMenuMutation,
        addMenuDateMutation,
        deleteMenuDateMutation,
        addMenuFieldMutation,
        addMenuFieldProductMutation,
        deleteMenuFieldMutation,
        deleteMenuFieldProductMutation,
        addMenuRoleMutation,
        deleteMenuRoleMutation,
    };
};

export default useMenuMutations;
