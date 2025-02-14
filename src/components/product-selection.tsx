import {useEffect, useState} from "react";

import {Product} from "../models/products.model.ts";
import VariantSelector from "./variant-selector.tsx";
import {OrderProduct} from "../models/order.model.ts";
import QuantitySelector from "./quantity-selector.tsx";
import IngredientsSelector from "./ingredients-selector.tsx";

interface ProductSelectionProps {
    product: Product;
    isFromMenu: boolean;
    resetTrigger?: number;
    updateProductInState: (orderProduct: OrderProduct) => void;
}

export default function ProductSelection({
                                             product,
                                             isFromMenu,
                                             resetTrigger,
                                             updateProductInState
                                         }: ProductSelectionProps) {
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<Map<number, number>>(new Map());
    const [calculatedPrice, setCalculatedPrice] = useState<number>(isFromMenu ? 0 : product.price);

    const createProductInstance = (): OrderProduct => {
        return {
            product_id: product.id,
            ingredients: Array.from(selectedIngredientIds, ([id, quantity]) => ({ingredient_id: id, quantity})),
            quantity: selectedQuantity,
            variant_id: selectedVariantId ?? undefined,
            price: calculatedPrice
        };
    };

    const handleQuantityChange = (change: number) => {
        setSelectedQuantity((prevState) => prevState + change);
    };

    const handleSelectedVariantIdChange = (variantId: number | null) => {
        setSelectedVariantId(variantId);
    };

    const handleIngredientChange = (ingredientId: number, change: number) => {
        setSelectedIngredientIds((prev) => {
            const newSelection = new Map(prev);
            const currentQuantity = newSelection.get(ingredientId) || 0;
            const updatedQuantity = currentQuantity + change;

            if (updatedQuantity > 0) {
                newSelection.set(ingredientId, updatedQuantity);
            } else {
                newSelection.delete(ingredientId);
            }
            return newSelection;
        });
    };

    const resetState = () => {
        setSelectedQuantity(0);
        setSelectedVariantId(null);
        setSelectedIngredientIds(new Map());
        setCalculatedPrice(isFromMenu ? 0 : product.price);
    };

    useEffect(() => {
        resetState();
    }, [resetTrigger]);

    useEffect(() => {
        let basePrice = isFromMenu ? 0 : product.price;

        if (selectedVariantId !== null) {
            const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
            if (selectedVariant) basePrice += selectedVariant.price;
        }

        if (selectedIngredientIds.size > 0) {
            const ingredientsPrice = Array.from(selectedIngredientIds).reduce((total, [id, quantity]) => {
                const ingredient = product.ingredients?.find((ing) => ing.id === id);
                return ingredient ? total + ingredient.price * quantity : total;
            }, 0);
            basePrice += ingredientsPrice;
        }

        let newPrice = basePrice * selectedQuantity;
        if (!isFromMenu && selectedQuantity === 0) {
            newPrice = product.price;
        }

        setCalculatedPrice(newPrice);
    }, [selectedQuantity, selectedVariantId, selectedIngredientIds, product]);

    useEffect(() => {
        if (isFromMenu) updateProductInState(createProductInstance());
    }, [selectedQuantity, selectedVariantId, selectedIngredientIds, calculatedPrice]);

    return (
        <div key={product.id} className="mb-3">
            {isFromMenu ?
                <div className="row align-items-center g-2">
                    <div className="col-auto">
                        <label className="form-check-label" htmlFor={`product-${product.id}`}>
                            {product.name}
                        </label>
                    </div>
                    <div className="col-auto">
                        <QuantitySelector quantity={selectedQuantity} handleQuantityChange={handleQuantityChange}/>
                    </div>
                </div> :
                <div className="row">
                    <div className="col-4">
                        <h4 className="mb-0 text-break">{product.name}</h4>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-start">
                        <QuantitySelector quantity={selectedQuantity} handleQuantityChange={handleQuantityChange}/>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <h6><strong>Price:&nbsp;</strong>{calculatedPrice.toFixed(2)} €</h6>
                    </div>
                </div>
            }
            <div className="ms-4 mt-2">
                {product.variants && product.variants.length > 0 && (
                    <VariantSelector
                        variants={product.variants}
                        selectedVariantId={selectedVariantId}
                        onVariantChange={handleSelectedVariantIdChange}
                    />
                )}
                {product.ingredients && product.ingredients.length > 0 && (
                    <IngredientsSelector
                        ingredients={product.ingredients}
                        selectedIngredientIds={selectedIngredientIds}
                        handleIngredientChange={handleIngredientChange}
                    />
                )}
                {!isFromMenu &&
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            updateProductInState(createProductInstance());
                            resetState();
                        }}>Add
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}