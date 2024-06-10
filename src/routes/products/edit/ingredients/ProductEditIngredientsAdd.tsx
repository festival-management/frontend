import React from "react";

type ProductEditIngredientsAddProps = {
    newProductIngredientName: string;
    newProductIngredientPrice: number;
    handleProductIngredientNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProductIngredientPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditIngredientsAdd({
                                                      newProductIngredientName,
                                                      newProductIngredientPrice,
                                                      handleProductIngredientNameChange,
                                                      handleProductIngredientPriceChange,
                                                      handleSubmit
                                                  }: ProductEditIngredientsAddProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="newProductIngredientName"
                    placeholder="Input the short name of product ingredient"
                    value={newProductIngredientName}
                    onChange={handleProductIngredientNameChange}
                    required
                />
                <span className="input-group-text">Price</span>
                <input
                    type="number"
                    className="form-control"
                    id="newProductIngredientPrice"
                    placeholder="Input the price of product ingredient"
                    min="0"
                    value={newProductIngredientPrice}
                    onChange={handleProductIngredientPriceChange}
                    step='0.01'
                    required
                />
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}