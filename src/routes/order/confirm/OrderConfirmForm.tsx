import React, {useState} from "react";

import useOrdersApi from "../../../api/orders.ts";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useOrderMutations from "../../../hooks/mutations/use-order-mutations.ts";
import {ErrorCodes} from "../../../errors/ErrorCodes.ts";

export default function OrderConfirmForm() {
    const [orderId, setOrderId] = useState<null | number>(null);
    const [table, setTable] = useState<null | number>(null);

    const ordersApi = useOrdersApi();

    const {addToast} = useToastContext();
    const {confirmOrderMutation} = useOrderMutations(ordersApi);

    const handleNewOrderIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setOrderId(value === "" ? null : parseInt(value));
    };

    const handleNewTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTable(value === "" ? null : parseInt(value));
    };

    const handleSubmitConfirmOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!orderId || !table) {
            return addToast(ErrorCodes.MISSING_ORDER_ID_OR_TABLE, "error");
        }

        await confirmOrderMutation.mutateAsync({orderId: orderId, table: table});

        setOrderId(null);
        setTable(null);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitConfirmOrder}>
            <h6>Confirm Order</h6>
            <div className="mb-3">
                <label htmlFor="confirmOrderOrderId" className="form-label">Order id:</label>
                <input type="number" className="form-control" id="confirmOrderOrderId" min="1" value={orderId === null ? "" : orderId} onChange={handleNewOrderIdChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="confirmOrderTable" className="form-label">Table:</label>
                <input type="number" className="form-control" id="confirmOrderTable" min="1" value={table === null ? "" : table} onChange={handleNewTableChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}