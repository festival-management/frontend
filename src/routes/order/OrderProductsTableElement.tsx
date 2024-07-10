import React, {useEffect, useState} from "react";

import {Product} from "../../models/products.model.ts";
import {OrderProduct} from "../../models/order.model.ts";
import {ToastType} from "../../models/toast-message.model.ts";
import VariantSelector from "../../components/variant-selector.tsx";
import QuantitySelector from "../../components/quantity-selector.tsx";
import IngredientsSelector from "../../components/ingredients-selector.tsx";

type OrderProductsTableElementProps = {
    product: Product;
    addToast: (message: string, type: ToastType) => void;
    handleSubmitAddProduct: (product: OrderProduct) => Promise<void>;
}

export default function OrderProductsTableElement({product, addToast, handleSubmitAddProduct}: OrderProductsTableElementProps) {
    const [price, setPrice] = useState(product.price);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedVariantId, setSelectedVariantId] = useState<number>(-1);
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedQuantity(parseInt(event.target.value));
    };

    const handleSelectedVariantIdChange = (variantId: number) => {
        setSelectedVariantId(variantId);
    };

    const handleSelectedIngredientsIdChange = (ingredientId: number, isSelected: boolean) => {
        if (isSelected) {
            setSelectedIngredientIds([...selectedIngredientIds, ingredientId]);
        } else {
            setSelectedIngredientIds(selectedIngredientIds.filter(id => id !== ingredientId));
        }
    };

    const handleSubmit = async () => {
        if (product.variants && product.variants.length > 0 && selectedVariantId === -1) {
            return addToast("Variant not exist", "error");
        }

        await handleSubmitAddProduct({
            product_id: product.id,
            variant_id: selectedVariantId,
            ingredients: product.ingredients && selectedIngredientIds.length > 0 ? selectedIngredientIds : undefined,
            quantity: selectedQuantity,
            price: price
        });

        setPrice(product.price);
        setSelectedQuantity(1);
        setSelectedVariantId(-1);
        setSelectedIngredientIds([]);
    };

    useEffect(() => {
        let basePrice = product.price;

        if (selectedVariantId !== -1) {
            const selectedVariant = product.variants!.find(v => v.id === selectedVariantId);
            if (selectedVariant) {
                basePrice += selectedVariant.price;
            }
        }

        if (selectedIngredientIds.length > 0) {
            const ingredientsPrice = selectedIngredientIds.reduce((total, id) => {
                const ingredient = product.ingredients!.find(ing => ing.id === id);
                return ingredient ? total + ingredient.price : total;
            }, 0);
            basePrice += ingredientsPrice;
        }

        setPrice(basePrice * selectedQuantity);
    }, [selectedQuantity, selectedVariantId, selectedIngredientIds, product]);

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">{product.name}</h4>
                    <h6 className="mb-0"><strong>Price:&nbsp;</strong>{price}</h6>
                </div>
                <div className="mt-2">
                    <QuantitySelector index={product.id} quantity={selectedQuantity}
                                      handleQuantityChange={handleQuantityChange}/>
                    {product.variants && product.variants.length > 0 && (
                        <VariantSelector
                            index={product.id}
                            variants={product.variants}
                            selectedVariantId={selectedVariantId}
                            onVariantChange={handleSelectedVariantIdChange}
                        />
                    )}
                    {product.ingredients && product.ingredients.length > 0 && (
                        <IngredientsSelector
                            ingredients={product.ingredients}
                            selectedIngredientIds={selectedIngredientIds}
                            onIngredientChange={handleSelectedIngredientsIdChange}
                        />
                    )}
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}