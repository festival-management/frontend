import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UsePrintersApiInterface} from "../../models/printers.model.ts";

const usePrinterMutations = (printersApi: UsePrintersApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addPrinterMutation = useMutation({
        mutationFn: (variables: {
            name: string,
            ipAddress: string
        }) => printersApi.addPrinter(variables.name, variables.ipAddress),
        onSuccess: onSuccessMutation
    });

    // Updates
    const updatePrinterIpAddressMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            ipAddress: string
        }) => printersApi.updatePrinterIpAddress(variables.id, variables.ipAddress),
        onSuccess: onSuccessMutation
    });
    const updatePrinterNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => printersApi.updatePrinterName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deletePrinterMutation = useMutation({
        mutationFn: printersApi.deletePrinter,
        onSuccess: onSuccessMutation
    });

    return {addPrinterMutation, updatePrinterIpAddressMutation, updatePrinterNameMutation, deletePrinterMutation};
};

export default usePrinterMutations;
