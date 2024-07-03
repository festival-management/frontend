import React from "react";

import {ProductIngredient} from "../models/products.model.ts";

type IngredientsSelectorProps = {
    ingredients: ProductIngredient[];
    selectedIngredientIds: number[];
    onIngredientChange: (ingredientId: number, isSelected: boolean) => void;
};

export default function IngredientsSelector({ingredients, selectedIngredientIds, onIngredientChange}: IngredientsSelectorProps) {
    return (
        <div className="mb-3">
            <h6><strong>Ingredients:</strong></h6>
            {ingredients.map(ingredient => (
                <div key={ingredient.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`ingredient-${ingredient.id}`}
                        value={ingredient.id}
                        checked={selectedIngredientIds.includes(ingredient.id)}
                        onChange={(e) => onIngredientChange(ingredient.id, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`ingredient-${ingredient.id}`}>
                        {ingredient.name}
                    </label>
                </div>
            ))}
        </div>
    );
}