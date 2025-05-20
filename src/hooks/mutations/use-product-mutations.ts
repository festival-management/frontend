import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseProductsApiInterface} from "../../models/products.model.ts";

export const useProductMutations = (productsApi: UseProductsApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addProductMutation = useMutation({
        mutationFn: (variables: {
            name: string,
            shortName: string,
            price: number,
            category: string,
            subcategoryId: number
        }) => productsApi.addProduct(variables.name, variables.shortName, variables.price, variables.category, variables.subcategoryId),
        onSuccess: onSuccessMutation
    });

    // Updates
    const updateProductNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => productsApi.updateProductName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateProductOrderMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            order: number
        }) => productsApi.updateProductOrder(variables.id, variables.order),
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

    // Delete
    const deleteProductMutation = useMutation({
        mutationFn: productsApi.deleteProduct,
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
        addProductMutation,
        updateProductNameMutation,
        updateProductOrderMutation,
        updateProductShortNameMutation,
        updateProductPriorityMutation,
        updateProductPriceMutation,
        updateProductCategoryMutation,
        updateProductSubcategoryMutation,
        deleteProductMutation,
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
