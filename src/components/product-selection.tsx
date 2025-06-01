import {useEffect, useState} from "react";

import {Product} from "../models/products.model.ts";
import VariantSelector from "./variant-selector.tsx";
import {CreateOrderProduct} from "../models/order.model.ts";
import IngredientsSelector from "./ingredients-selector.tsx";
import QuantitySelector from "./quantity-selector.tsx";

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
    const [selectedQuantity, setSelectedQuantity] = useState<number>(isFromMenu ? 0 : 1);
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
        setSelectedQuantity(isFromMenu ? 0 : 1);
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

        setCalculatedPrice(basePrice * selectedQuantity);
    }, [selectedVariantId, selectedIngredientIds, product]);

    useEffect(() => {
        if (isFromMenu) updateProductInState(createProductInstance());
    }, [selectedQuantity, selectedVariantId, selectedIngredientIds, calculatedPrice]);

    return (
        <>
            <td className="align-middle">{product.name}</td>
            <td className="align-middle">
                {product.variants && product.variants.length > 0 && (
                    <VariantSelector
                        variants={product.variants}
                        selectedVariantId={selectedVariantId}
                        onVariantChange={handleSelectedVariantIdChange}
                    />
                )}
            </td>
            <td className="align-middle">
                {product.ingredients && product.ingredients.length > 0 && (
                    <IngredientsSelector
                        ingredients={product.ingredients}
                        selectedIngredientIds={selectedIngredientIds}
                        handleIngredientChange={handleIngredientChange}
                    />
                )}
            </td>
            {isFromMenu && (
                <td className="align-middle">
                    <QuantitySelector quantity={selectedQuantity} handleQuantityChange={handleQuantityChange}/>
                </td>
            )}
            {!isFromMenu && (
                <td className="align-middle">{calculatedPrice.toFixed(2)} €</td>
            )}
            {!isFromMenu && (
                <td className="align-middle">
                    <button type="button" className="btn btn-primary" onClick={() => {
                        updateProductInState(createProductInstance());
                        resetState();
                    }}>Add
                    </button>
                </td>
            )}
        </>
    );
}