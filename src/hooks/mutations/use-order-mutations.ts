import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {CreateOrderMenu, CreateOrderProduct, UseOrdersApiInterface} from "../../models/order.model.ts";

const useOrderMutations = (ordersApi: UseOrdersApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Create
    const addOrderMutation = useMutation({
        mutationFn: (variables: {
            customer: string,
            guests: number | null,
            isTakeAway: boolean,
            table: number | null,
            products: CreateOrderProduct[],
            menus: CreateOrderMenu[]
        }) => ordersApi.addOrder(variables.customer, variables.guests, variables.isTakeAway, variables.table, variables.products, variables.menus),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteOrderMutation = useMutation({
        mutationFn: ordersApi.deleteOrder,
        onSuccess: onSuccessMutation
    });

    return {addOrderMutation, deleteOrderMutation};
};

export default useOrderMutations;
