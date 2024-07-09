import React from "react";

type QuantitySelectorProps = {
    index: number;
    quantity: number;
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function QuantitySelector({index, quantity, handleQuantityChange}: QuantitySelectorProps) {
    return (
        <div className="mb-3 row align-items-center">
            <div className="col-2">
                <label htmlFor={`quantitySelect-${index}`} className="form-label"><strong>Choose a quantity:</strong></label>
            </div>
            <div className="col">
                <input
                    type="number"
                    className="form-control"
                    id={`quantitySelect-${index}`}
                    placeholder="Input the quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                />
            </div>
        </div>
    );
}