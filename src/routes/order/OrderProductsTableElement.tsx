import React, {useState} from "react";

import {Product} from "../../models/products.model.ts";

type OrderProductsTableElementProps = {
    product: Product;
}

export default function OrderProductsTableElement({product}: OrderProductsTableElementProps) {
    const [price, setPrice] = useState(product.price);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(-1);
    const [selectedIngredientsId, setSelectedIngredientsId] = useState<number[]>([]);

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

        if (selectedIngredientsId.includes(ingredientIndex)) {
            setSelectedIngredientsId((prevState) => prevState.splice(prevState.find((value) => value === ingredientIndex), 1));
            setPrice((prevState) => prevState - product.ingredients![ingredientIndex].price);
        } else {
            setSelectedIngredientsId((prevState) => [...prevState, ingredientIndex]);
            setPrice((prevState) => prevState + product.ingredients![ingredientIndex].price);
        }
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
                                            checked={selectedIngredientsId.includes(index)}
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
                        <button type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}