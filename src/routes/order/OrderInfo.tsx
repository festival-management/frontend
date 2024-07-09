import React from "react";

type OrderInfoProps = {
    customer: string;
    guests: number;
    isTakeAway: boolean;
    table: number;
    handleCustomerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleGuestsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleIsTakeAwayChange: () => void;
    handleTableChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OrderInfo({
                                      customer,
                                      guests,
                                      isTakeAway,
                                      table,
                                      handleCustomerChange,
                                      handleGuestsChange,
                                      handleIsTakeAwayChange,
                                      handleTableChange
                                  }: OrderInfoProps) {
    return (
        <div className="mb-3">
            <div className="input-group mb-3">
                <span className="input-group-text">Customer</span>
                <input type="text" id="newOrderCustomer" className="form-control" value={customer}
                       onChange={handleCustomerChange}
                       required/>
                <span className="input-group-text">Is take away?</span>
                <div className="form-control d-flex justify-content-center">
                    <input type="checkbox" id="newOrderIsTakeAway" className="form-check-input" checked={isTakeAway}
                           onChange={handleIsTakeAwayChange}
                           required/>
                </div>
                <span className="input-group-text">Guests</span>
                <input type="number" id="newOrderGuests" min="1" className="form-control" value={guests}
                       onChange={handleGuestsChange} disabled={isTakeAway}/>
                <span className="input-group-text">Table</span>
                <input type="number" id="newOrderTable" min="1" className="form-control" value={table}
                       onChange={handleTableChange} disabled={isTakeAway}/>
            </div>
        </div>
    );
}