import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseSubcategoriesApiInterface} from "../../models/subcategories.model.ts";

const useSubcategoryMutations = (subcategoriesApi: UseSubcategoriesApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addSubcategoryMutation = useMutation({
        mutationFn: subcategoriesApi.addSubcategory,
        onSuccess: onSuccessMutation
    });

    // Updates
    const updateSubcategoryIncludeCoverChargeMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            includeCoverCharge: boolean
        }) => subcategoriesApi.updateSubcategoryIncludeCoverCharge(variables.id, variables.includeCoverCharge),
        onSuccess: onSuccessMutation
    });
    const updateSubcategoryNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => subcategoriesApi.updateSubcategoryName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateSubcategoryOrderMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            order: number
        }) => subcategoriesApi.updateSubcategoryOrder(variables.id, variables.order),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteSubcategoryMutation = useMutation({
        mutationFn: subcategoriesApi.deleteSubcategory,
        onSuccess: onSuccessMutation
    });

    return {
        addSubcategoryMutation,
        updateSubcategoryIncludeCoverChargeMutation,
        updateSubcategoryNameMutation,
        updateSubcategoryOrderMutation,
        deleteSubcategoryMutation
    };
};

export default useSubcategoryMutations;
