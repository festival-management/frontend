import {useMutation, useQueryClient} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseSubcategoriesApiInterface} from "../../models/subcategories.model.ts";

const useSubcategoryMutations = (subcategoriesApi: UseSubcategoriesApiInterface) => {
    const {addToast} = useToastContext();
    const queryClient = useQueryClient();
    const {onSuccessMutation} = baseMutation(addToast, queryClient, "subcategories");

    // Updates
    const updateSubcategoryNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => subcategoriesApi.updateSubcategoryName(variables.id, variables.name),
        onSuccess: (data) => onSuccessMutation(data, true)
    });
    const updateSubcategoryOrderMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            order: number
        }) => subcategoriesApi.updateSubcategoryOrder(variables.id, variables.order),
        onSuccess: (data) => onSuccessMutation(data, true)
    });

    return {updateSubcategoryNameMutation, updateSubcategoryOrderMutation};
};

export default useSubcategoryMutations;
