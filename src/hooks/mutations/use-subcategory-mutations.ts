import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseSubcategoriesApiInterface} from "../../models/subcategories.model.ts";

const useSubcategoryMutations = (subcategoriesApi: UseSubcategoriesApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Updates
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

    return {updateSubcategoryNameMutation, updateSubcategoryOrderMutation};
};

export default useSubcategoryMutations;
