import React, {useState} from "react";

import {Product} from "../../models/products.model.ts";
import {OrderProduct} from "../../models/order.model.ts";

type OrderProductsTableElementProps = {
    product: Product;
    handleSubmitAddProduct: (product: OrderProduct) => Promise<void>;
}

export default function OrderProductsTableElement({product, handleSubmitAddProduct}: OrderProductsTableElementProps) {
    const [price, setPrice] = useState(product.price);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(-1);
    const [selectedIngredientsIndex, setSelectedIngredientsIndex] = useState<number[]>([]);

    const handleSelectedVariantIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const prevVariantIndex = selectedVariantIndex;
        const variantIndex = parseInt(event.target.value);

        setSelectedVariantIndex(variantIndex);

        if (variantIndex < 0) {
            return setPrice((prevState) => prevState - product.variants![prevVariantIndex].price);
        }

        setPrice((prevState) => prevState + product.variants![variantIndex].price);
    };

    const handleSelectedIngredientsIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ingredientIndex = parseInt(event.target.value);

        if (selectedIngredientsIndex.includes(ingredientIndex)) {
            setSelectedIngredientsIndex((prevState) => prevState.splice(prevState.find((value) => value === ingredientIndex), 1));
            setPrice((prevState) => prevState - product.ingredients![ingredientIndex].price);
        } else {
            setSelectedIngredientsIndex((prevState) => [...prevState, ingredientIndex]);
            setPrice((prevState) => prevState + product.ingredients![ingredientIndex].price);
        }
    };

    const handleSubmit = async () => {
        await handleSubmitAddProduct({
            id: product.id,
            variant: product.variants && product.variants.length > 0 ? product.variants![selectedVariantIndex].id : undefined,
            ingredients: product.ingredients && product.ingredients.length > 0 ? selectedIngredientsIndex.map((value) => product.ingredients![value].id) : undefined
        });

        setPrice(product.price);
        setSelectedVariantIndex(-1);
        setSelectedIngredientsIndex([]);
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">{product.name}</h4>
                    <h6 className="mb-0"><strong>Price:&nbsp;</strong>{price}</h6>
                </div>
                <div className="mt-2">
                    {product.variants && product.variants.length > 0 ?
                        <div className="mb-3">
                            <label htmlFor="variantSelect" className="form-label"><strong>Choose a
                                variant:</strong></label>
                            <select id="variantSelect" className="form-select" value={selectedVariantIndex}
                                    onChange={handleSelectedVariantIdChange}>
                                <option value="-1">Select Variant</option>
                                {product.variants!.map((variant, index) => (
                                    <option key={index} value={index}>{variant.name}</option>
                                ))}
                            </select>
                        </div> : null}
                    {product.ingredients && product.ingredients.length > 0 ?
                        <div className="mb-3">
                            <h6><strong>Ingredients:</strong></h6>
                            <div className="form-check">
                                {product.ingredients!.map((ingredient, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`ingredient-${index}`}
                                            value={index}
                                            checked={selectedIngredientsIndex.includes(index)}
                                            onChange={handleSelectedIngredientsIdChange}
                                        />
                                        <label className="form-check-label" htmlFor={`ingredient-${index}`}>
                                            {ingredient.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div> : null}
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}