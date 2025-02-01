import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseProductsApiInterface} from "../../models/products.model.ts";

export const useProductMutations = (productsApi: UseProductsApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Updates
    const updateProductNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => productsApi.updateProductName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateProductShortNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            shortName: string
        }) => productsApi.updateProductShortName(variables.id, variables.shortName),
        onSuccess: onSuccessMutation
    });
    const updateProductPriorityMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            priority: boolean
        }) => productsApi.updateProductIsPriority(variables.id, variables.priority),
        onSuccess: onSuccessMutation
    });
    const updateProductPriceMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            price: number
        }) => productsApi.updateProductPrice(variables.id, variables.price),
        onSuccess: onSuccessMutation
    });
    const updateProductCategoryMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            category: string
        }) => productsApi.updateProductCategory(variables.id, variables.category),
        onSuccess: onSuccessMutation
    });
    const updateProductSubcategoryMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            subcategoryId: number
        }) => productsApi.updateProductSubcategory(variables.id, variables.subcategoryId),
        onSuccess: onSuccessMutation
    });

    // Dates
    const addProductDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            startDate: string,
            endDate: string
        }) => productsApi.addProductDate(variables.id, variables.startDate, variables.endDate),
        onSuccess: onSuccessMutation
    });
    const deleteProductDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productDateId: number
        }) => productsApi.deleteProductDate(variables.id, variables.productDateId),
        onSuccess: onSuccessMutation
    });

    // Ingredients
    const addProductIngredientMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string,
            price: number
        }) => productsApi.addProductIngredient(variables.id, variables.name, variables.price),
        onSuccess: onSuccessMutation
    });
    const deleteProductIngredientMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productIngredientId: number
        }) => productsApi.deleteProductIngredient(variables.id, variables.productIngredientId),
        onSuccess: onSuccessMutation
    });

    // Roles
    const addProductRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            roleId: number
        }) => productsApi.addProductRole(variables.id, variables.roleId),
        onSuccess: onSuccessMutation
    });
    const deleteProductRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productRoleId: number
        }) => productsApi.deleteProductRole(variables.id, variables.productRoleId),
        onSuccess: onSuccessMutation
    });

    // Variants
    const addProductVariantMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string,
            price: number
        }) => productsApi.addProductVariant(variables.id, variables.name, variables.price),
        onSuccess: onSuccessMutation
    });
    const deleteProductVariantMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productVariantId: number
        }) => productsApi.deleteProductVariant(variables.id, variables.productVariantId),
        onSuccess: onSuccessMutation
    });

    return {
        updateProductNameMutation,
        updateProductShortNameMutation,
        updateProductPriorityMutation,
        updateProductPriceMutation,
        updateProductCategoryMutation,
        updateProductSubcategoryMutation,
        addProductDateMutation,
        deleteProductDateMutation,
        addProductIngredientMutation,
        deleteProductIngredientMutation,
        addProductRoleMutation,
        deleteProductRoleMutation,
        addProductVariantMutation,
        deleteProductVariantMutation
    }
};
