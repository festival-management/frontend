import {useEffect, useState} from "react";

import {Product} from "../models/products.model.ts";
import VariantSelector from "./variant-selector.tsx";
import QuantitySelector from "./quantity-selector.tsx";
import {CreateOrderProduct} from "../models/order.model.ts";
import IngredientsSelector from "./ingredients-selector.tsx";

interface ProductSelectionProps {
    product: Product;
    isFromMenu: boolean;
    resetTrigger?: number;
    updateProductInState: (orderProduct: CreateOrderProduct) => void;
}

export default function ProductSelection({
                                             product,
                                             isFromMenu,
                                             resetTrigger,
                                             updateProductInState
                                         }: ProductSelectionProps) {
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);
    const [calculatedPrice, setCalculatedPrice] = useState<number>(isFromMenu ? 0 : product.price);

    const createProductInstance = (): CreateOrderProduct => {
        return {
            product_id: product.id,
            ingredients: selectedIngredientIds.map(id => ({ingredient_id: id})),
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

    const handleIngredientChange = (ingredientId: number) => {
        setSelectedIngredientIds((prev) => {
            if (prev.includes(ingredientId)) {
                return prev.filter(id => id !== ingredientId);
            } else {
                return [...prev, ingredientId];
            }
        });
    };

    const resetState = () => {
        setSelectedQuantity(0);
        setSelectedVariantId(null);
        setSelectedIngredientIds([]);
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

        if (selectedIngredientIds.length > 0) {
            const ingredientsPrice = selectedIngredientIds.reduce((total, id) => {
                const ingredient = product.ingredients?.find((ing) => ing.id === id);
                return ingredient ? total + ingredient.price : total;
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
                        <label className="form-check-label">
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