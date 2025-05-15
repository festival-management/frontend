import React, {useState} from "react";

import useOrdersApi from "../../../api/orders.ts";
import useOrderMutations from "../../../hooks/mutations/use-order-mutations.ts";

export default function OrderConfirmForm() {
    const [orderId, setOrderId] = useState(1);
    const [table, setTable] = useState(1);

    const ordersApi = useOrdersApi();
    const {confirmOrderMutation} = useOrderMutations(ordersApi);

    const handleNewOrderIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderId(parseInt(event.target.value));
    };

    const handleNewTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTable(parseInt(event.target.value));
    };

    const handleSubmitConfirmOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await confirmOrderMutation.mutateAsync({orderId: orderId, table: table});

        setOrderId(1);
        setTable(1);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitConfirmOrder}>
            <h6>Confirm Order</h6>
            <div className="mb-3">
                <label htmlFor="confirmOrderOrderId" className="form-label">Order id:</label>
                <input type="number" className="form-control" id="confirmOrderOrderId" min="1" value={orderId} onChange={handleNewOrderIdChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="confirmOrderTable" className="form-label">Table:</label>
                <input type="number" className="form-control" id="confirmOrderTable" min="1" value={table} onChange={handleNewTableChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}