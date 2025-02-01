import React from "react";

import {Category} from "../../../enums/category";
import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditCategoryForm() {
    const {productId, productCategory, setProductCategory, productsApi} = useProductEditContext();
    const {updateProductCategoryMutation} = useProductMutations(productsApi);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductCategory(event.target.value);
    };

    const handleSubmitChangeCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductCategoryMutation.mutate({id: productId, category: productCategory});
    };

    return (
        <>
            <h6>Change category</h6>
            <form onSubmit={handleSubmitChangeCategory}>
                <div className="mb-3">
                    <select className="form-select mb-3" id="formInputCategory"
                            value={productCategory}
                            onChange={handleCategoryChange}>
                        <option value="-1">Open this select menu</option>
                        {Object.values(Category).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}