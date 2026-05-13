import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {PrinterType} from "../../enums/printer-type.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {CreateOrderMenu, CreateOrderProduct, UseOrdersApiInterface} from "../../models/order.model.ts";

const useOrderMutations = (ordersApi: UseOrdersApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Confirm
    const confirmOrderMutation = useMutation({
        mutationFn: (variables: {
            orderId: number,
            table: number | null,
            isTakeawayOrKiosk: boolean,
        })=> ordersApi.confirmOrder(variables.orderId, variables.table, variables.isTakeawayOrKiosk),
        onSuccess: onSuccessMutation
    });

    // Create
    const addOrderMutation = useMutation({
        mutationFn: (variables: {
            customer: string,
            guests: number | null,
            isTakeAway: boolean,
            isTakeAwayKiosk: boolean,
            table: number | null,
            isVoucher: boolean,
            parentOrder: number | null,
            products: CreateOrderProduct[],
            menus: CreateOrderMenu[]
        }) => ordersApi.addOrder(variables.customer, variables.guests, variables.isTakeAway, variables.isTakeAwayKiosk, variables.table, variables.isVoucher, variables.parentOrder, variables.products, variables.menus),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteOrderMutation = useMutation({
        mutationFn: ordersApi.deleteOrder,
        onSuccess: onSuccessMutation
    });

    // Print
    const printOrderMutation = useMutation({
        mutationFn: (variables: {
            orderId: number,
            printerTypes?: PrinterType[]
        }) => ordersApi.printOrder(variables.orderId, variables.printerTypes),
        onSuccess: onSuccessMutation
    });

    // Serve
    const serveOrderMutation = useMutation({
        mutationFn: ordersApi.serveOrder,
        onSuccess: onSuccessMutation
    });

    return {
        confirmOrderMutation,
        addOrderMutation,
        deleteOrderMutation,
        printOrderMutation,
        serveOrderMutation
    };
};

export default useOrderMutations;
