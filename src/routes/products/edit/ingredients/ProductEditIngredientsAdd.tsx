import React, {useState} from "react";

import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditIngredientsAdd() {
    const [newProductIngredientName, setNewProductIngredientName] = useState("");
    const [newProductIngredientPrice, setNewProductIngredientPrice] = useState(0);

    const {productId, setProductIngredients, productsApi} = useProductEditContext();
    const {addProductIngredientMutation} = useProductMutations(productsApi);

    const handleProductIngredientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductIngredientName(event.target.value);
    };

    const handleProductIngredientPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductIngredientPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddIngredient = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addProductIngredientMutation.mutateAsync({id: productId, name: newProductIngredientName, price: newProductIngredientPrice});

        if (!response.error) {
            setProductIngredients((prevState) => [...prevState, response.ingredient!]);
        }

        setNewProductIngredientName("");
        setNewProductIngredientPrice(0);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddIngredient}>
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