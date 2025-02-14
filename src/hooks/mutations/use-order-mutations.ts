import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {OrderMenu, OrderProduct, UseOrdersApiInterface} from "../../models/order.model.ts";

const useOrderMutations = (ordersApi: UseOrdersApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    const addOrderMutation = useMutation({
        mutationFn: (variables: {
            customer: string,
            guests: number | null,
            isTakeAway: boolean,
            table: number | null,
            products: OrderProduct[],
            menus: OrderMenu[]
        }) => ordersApi.addOrder(variables.customer, variables.guests, variables.isTakeAway, variables.table, variables.products, variables.menus),
        onSuccess: onSuccessMutation
    });

    return {addOrderMutation};
};

export default useOrderMutations;
