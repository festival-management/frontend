import React, {useState} from "react";

import {ProductIngredient} from "../../../../models/products.model.ts";
import ProductEditIngredientsAdd from "./ProductEditIngredientsAdd.tsx";
import ProductEditIngredientsTable from "./ProductEditIngredientsTable.tsx";

type ProductEditIngredientsProps = {
    productIngredients: ProductIngredient[];
    handleDelete: (productIngredientId: number) => Promise<void>;
    handleSubmit: (name: string, price: number) => Promise<void>;
}

export default function ProductEditIngredients({
                                                   productIngredients,
                                                   handleDelete,
                                                   handleSubmit
                                               }: ProductEditIngredientsProps) {
    const [newProductIngredientName, setNewProductIngredientName] = useState("");
    const [newProductIngredientPrice, setNewProductIngredientPrice] = useState(0);

    const handleProductIngredientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductIngredientName(event.target.value);
    };

    const handleProductIngredientPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductIngredientPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddIngredient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newProductIngredientName, newProductIngredientPrice);

        setNewProductIngredientName("");
        setNewProductIngredientPrice(0);
    };

    return (
        <>
            <h6 className="mb-3">Ingredients</h6>
            <ProductEditIngredientsAdd newProductIngredientName={newProductIngredientName}
                                       newProductIngredientPrice={newProductIngredientPrice}
                                       handleProductIngredientNameChange={handleProductIngredientNameChange}
                                       handleProductIngredientPriceChange={handleProductIngredientPriceChange}
                                       handleSubmit={handleSubmitAddIngredient}/>
            <ProductEditIngredientsTable data={productIngredients} handleDelete={handleDelete}/>
            <hr/>
        </>
    );
}