import React, {useState} from "react";

import {Product} from "../../models/products.model.ts";
import {OrderProduct} from "../../models/order.model.ts";
import VariantSelector from "../../components/variant-selector.tsx";
import IngredientsSelector from "../../components/ingredients-selector.tsx";

type OrderProductsTableElementProps = {
    product: Product;
    handleSubmitAddProduct: (product: OrderProduct) => Promise<void>;
}

export default function OrderProductsTableElement({product, handleSubmitAddProduct}: OrderProductsTableElementProps) {
    const [price, setPrice] = useState(product.price);
    const [selectedVariantId, setSelectedVariantId] = useState<number>(-1);
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);

    const handleSelectedVariantIdChange = (variantId: number) => {
        if (selectedVariantId !== -1) {
            setPrice(price - product.variants!.find(v => v.id === selectedVariantId)!.price);
        }

        if (variantId !== -1) {
            setPrice(price + product.variants!.find(v => v.id === variantId)!.price);
        }

        setSelectedVariantId(variantId);
    };

    const handleSelectedIngredientsIdChange = (ingredientId: number, isSelected: boolean) => {
        if (isSelected) {
            setSelectedIngredientIds([...selectedIngredientIds, ingredientId]);
            setPrice(price + product.ingredients!.find(ing => ing.id === ingredientId)!.price);
        } else {
            setSelectedIngredientIds(selectedIngredientIds.filter(id => id !== ingredientId));
            setPrice(price - product.ingredients!.find(ing => ing.id === ingredientId)!.price);
        }
    };

    const handleSubmit = async () => {
        await handleSubmitAddProduct({
            id: product.id,
            variant: product.variants && product.variants.length > 0 ? selectedVariantId : undefined, // TODO
            ingredients: product.ingredients && selectedIngredientIds.length > 0 ? selectedIngredientIds : undefined,
            price: price
        });

        setPrice(product.price);
        setSelectedVariantId(null);
        setSelectedIngredientIds([]);
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">{product.name}</h4>
                    <h6 className="mb-0"><strong>Price:&nbsp;</strong>{price}</h6>
                </div>
                <div className="mt-2">
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