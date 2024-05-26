import React from "react";

type ProductEditPriceFormProps = {
    price: number;
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditPriceForm({price, handlePriceChange, handleSubmit}: ProductEditPriceFormProps) {
    return (
        <>
            <h6>Change price</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputPrice"
                        placeholder="Input the price of product"
                        min="0"
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}