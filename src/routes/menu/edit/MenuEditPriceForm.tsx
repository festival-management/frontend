import React from "react";

type MenuEditPriceFormProps = {
    price: number;
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MenuEditPriceForm({price, handlePriceChange, handleSubmit}: MenuEditPriceFormProps) {
    return (
        <>
            <h6>Change price</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputPrice"
                        placeholder="Input the price of menu"
                        min="0"
                        step="0.01"
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