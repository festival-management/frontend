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

    // Updates
    const updateTableNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => tablesApi.updateTableName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateTableSeatsMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            seatStart: number,
            seatEnd: number
        }) => tablesApi.updateTableSeats(variables.id, variables.seatStart, variables.seatEnd),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteTableMutation = useMutation({
        mutationFn: tablesApi.deleteTable,
        onSuccess: onSuccessMutation
    });

    return {addTableMutation, updateTableNameMutation, updateTableSeatsMutation, deleteTableMutation};
};

export default useTableMutations;
