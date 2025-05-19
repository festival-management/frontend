import {ProductIngredient} from "../models/products.model.ts";

type IngredientsSelectorProps = {
    ingredients: ProductIngredient[];
    selectedIngredientIds: number[];
    handleIngredientChange: (ingredientId: number) => void;
};

export default function IngredientsSelector({
                                                ingredients,
                                                selectedIngredientIds,
                                                handleIngredientChange
                                            }: IngredientsSelectorProps) {
    return (
        <div className="mb-3 d-flex flex-wrap flex-column">
            {ingredients.map((ingredient) => {
                return (
                    <div key={ingredient.id} className="d-flex align-items-center me-3 mb-2">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={selectedIngredientIds.includes(ingredient.id)}
                                onChange={() => handleIngredientChange(ingredient.id)}
                                id={`ingredientSelector${ingredient.id}`}
                            />
                            <label className="form-check-label" htmlFor={`ingredientSelector${ingredient.id}`}>
                                {ingredient.name}
                            </label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}