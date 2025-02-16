import QuantitySelector from "./quantity-selector.tsx";
import {ProductIngredient} from "../models/products.model.ts";

type IngredientsSelectorProps = {
    ingredients: ProductIngredient[];
    selectedIngredientIds: Map<number, number>;
    handleIngredientChange: (ingredientId: number, change: number) => void;
};

export default function IngredientsSelector({
                                                ingredients,
                                                selectedIngredientIds,
                                                handleIngredientChange
                                            }: IngredientsSelectorProps) {
    return (
        <div className="mb-3 d-flex flex-wrap flex-column">
            {ingredients.map((ingredient) => {
                const quantity = selectedIngredientIds.get(ingredient.id) || 0;
                return (
                    <div key={ingredient.id} className="d-flex align-items-center me-3 mb-2">
                        <QuantitySelector
                            quantity={quantity}
                            handleQuantityChange={(change) => handleIngredientChange(ingredient.id, change)}
                        />
                        <label className="form-check-label ms-2 text-break">
                            {ingredient.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}