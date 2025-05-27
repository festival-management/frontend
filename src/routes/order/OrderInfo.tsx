import React from "react";

import {SettingsUser} from "../../models/settings.ts";
import {useOrderContext} from "../../contexts/OrderContext.tsx";

interface OrderInfoProps {
    settings: SettingsUser;
}

export default function OrderInfo({settings}: OrderInfoProps) {
    const {
        orderCustomer,
        setOrderCustomer,
        orderIsTakeAway,
        setOrderIsTakeAway,
        orderGuests,
        setOrderGuests,
        orderTable,
        setOrderTable
    } = useOrderContext();

    const handleOrderCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderCustomer(event.target.value);
    };

    const handleOrderIsTakeAwayChange = () => {
        setOrderIsTakeAway((prevState) => !prevState);
    };

    const handleOrderGuestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderGuests(parseInt(event.target.value));
    };

    const handleOrderTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderTable(parseInt(event.target.value));
    };

    return (
        <div className="mb-3">
            <div className="input-group mb-3">
                <span className="input-group-text">Customer</span>
                <input type="text" id="newOrderCustomer" className="form-control" value={orderCustomer}
                       onChange={handleOrderCustomerChange}
                       required/>
                <span className="input-group-text">Is take away?</span>
                <div className="form-control form-switch d-flex justify-content-center">
                    <input type="checkbox" id="newOrderIsTakeAway" className="form-check-input"
                           checked={orderIsTakeAway}
                           onChange={handleOrderIsTakeAwayChange}
                           required/>
                </div>
                <span className="input-group-text">Guests</span>
                <input type="number" id="newOrderGuests" min="1" className="form-control" value={orderGuests}
                       onChange={handleOrderGuestsChange} disabled={orderIsTakeAway}/>
                {
                    settings.order_requires_confirmation ? null :
                        <>
                            <span className="input-group-text">Table</span>
                            <input type="number" id="newOrderTable" min="1" className="form-control" value={orderTable}
                                   onChange={handleOrderTableChange} disabled={orderIsTakeAway}/>
                        </>
                }
            </div>
        </div>
    );
}