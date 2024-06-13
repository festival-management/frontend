import React from "react";

type ProductEditVariantAddProps = {
    newProductVariantName: string;
    newProductVariantPrice: number;
    handleProductVariantNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProductVariantPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditVariantAdd({
                                                  newProductVariantName,
                                                  newProductVariantPrice,
                                                  handleProductVariantNameChange,
                                                  handleProductVariantPriceChange,
                                                  handleSubmit
                                              }: ProductEditVariantAddProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="newProductVariantName"
                    placeholder="Input the name of product variant"
                    value={newProductVariantName}
                    onChange={handleProductVariantNameChange}
                    required
                />
                <span className="input-group-text">Price</span>
                <input
                    type="number"
                    className="form-control"
                    id="newProductVariantPrice"
                    placeholder="Input the price of product variant"
                    min="0"
                    value={newProductVariantPrice}
                    onChange={handleProductVariantPriceChange}
                    step='0.01'
                    required
                />
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}