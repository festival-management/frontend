import React, {useState} from "react";

import useOrdersApi from "../../../api/orders.ts";
import {ErrorCodes} from "../../../errors/ErrorCodes.ts";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useOrderMutations from "../../../hooks/mutations/use-order-mutations.ts";

export default function OrderServeForm() {
    const [orderId, setOrderId] = useState<null | number>(null);

    const ordersApi = useOrdersApi();

    const {addToast} = useToastContext();
    const {serveOrderMutation} = useOrderMutations(ordersApi);

    const handleNewOrderIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setOrderId(value === "" ? null : parseInt(value));
    };

    const handleSubmitServeOrder = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!orderId) {
            return addToast(ErrorCodes.MISSING_ORDER_ID_OR_TABLE, "error");
        }

        await serveOrderMutation.mutateAsync(orderId);

        setOrderId(null);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitServeOrder}>
            <h6>Serve Order</h6>
            <div className="mb-3">
                <label htmlFor="serveOrderOrderId" className="form-label">Order id:</label>
                <input type="number" className="form-control" id="serveOrderOrderId" min="1"
                       value={orderId === null ? "" : orderId} onChange={handleNewOrderIdChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
