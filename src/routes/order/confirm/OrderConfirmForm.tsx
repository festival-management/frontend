import React, {useState} from "react";

import useOrdersApi from "../../../api/orders.ts";
import {ErrorCodes} from "../../../errors/ErrorCodes.ts";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useOrderMutations from "../../../hooks/mutations/use-order-mutations.ts";

export default function OrderConfirmForm() {
    const [orderId, setOrderId] = useState<null | number>(null);
    const [isTakeAwayOrKiosk, setIsTakeAwayOrKiosk] = useState(false);
    const [table, setTable] = useState<null | number>(null);

    const ordersApi = useOrdersApi();

    const {addToast} = useToastContext();
    const {confirmOrderMutation} = useOrderMutations(ordersApi);

    const handleNewOrderIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setOrderId(value === "" ? null : parseInt(value));
    };

    const handleIsTakeAwayOrKioskChange = () => {
        setIsTakeAwayOrKiosk((prevState) => !prevState);
        setTable(null);
    };

    const handleNewTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTable(value === "" ? null : parseInt(value));
    };

    const handleSubmitConfirmOrder = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!orderId || !table && !isTakeAwayOrKiosk) {
            return addToast(ErrorCodes.MISSING_ORDER_ID_OR_TABLE, "error");
        }

        if (isTakeAwayOrKiosk && !orderId) {
            return addToast(ErrorCodes.MISSING_ORDER_ID_OR_TABLE, "error");
        }

        await confirmOrderMutation.mutateAsync({orderId: orderId, table: table, isTakeawayOrKiosk: isTakeAwayOrKiosk});

        setOrderId(null);
        setIsTakeAwayOrKiosk(false);
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
                <label htmlFor="confirmOrderIsTakeAwayOrKiosk" className="form-label">Is takeaway or kiosk:</label>
                <input type="checkbox" className="form-check-input" id="confirmOrderIsTakeAwayOrKiosk"
                       checked={isTakeAwayOrKiosk} onChange={handleIsTakeAwayOrKioskChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="confirmOrderTable" className="form-label">Table:</label>
                <input type="number" className="form-control" id="confirmOrderTable" min="1"
                       value={table === null ? "" : table} onChange={handleNewTableChange} disabled={isTakeAwayOrKiosk}
                       required={!isTakeAwayOrKiosk}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}