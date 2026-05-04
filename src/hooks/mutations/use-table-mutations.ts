import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseTablesApiInterface} from "../../models/tables.model.ts";

const useTableMutations = (tablesApi: UseTablesApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addTableMutation = useMutation({
        mutationFn: (variables: {
            name: string,
            seatStart: number,
            seatEnd: number,
        }) => tablesApi.addTable(variables.name, variables.seatStart, variables.seatEnd),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteTableMutation = useMutation({
        mutationFn: tablesApi.deleteTable,
        onSuccess: onSuccessMutation
    });

    return {addTableMutation, deleteTableMutation};
};

export default useTableMutations;
