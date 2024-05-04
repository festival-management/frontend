import React from "react";

type SubcategoryEditOrderFormProps = {
    order: number;
    handleOrderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SubcategoryEditOrderForm({
                                                     order,
                                                     handleOrderChange,
                                                     handleSubmit
                                                 }: SubcategoryEditOrderFormProps) {
    return (
        <>
            <h6>Change order</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputOrder"
                        placeholder="Input the order of subcategory"
                        min="0"
                        value={order}
                        onChange={handleOrderChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    );
}