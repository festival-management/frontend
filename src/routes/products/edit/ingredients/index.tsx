import ProductEditIngredientsAdd from "./ProductEditIngredientsAdd.tsx";
import ProductEditIngredientsTable from "./ProductEditIngredientsTable.tsx";

export default function ProductEditIngredients() {
    return (
        <>
            <h6 className="mb-3">Ingredients</h6>
            <ProductEditIngredientsAdd/>
            <ProductEditIngredientsTable/>
            <hr/>
        </>
    );
}