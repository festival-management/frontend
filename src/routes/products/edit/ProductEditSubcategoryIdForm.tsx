import React from "react";

import {SubcategoryName} from "../../../models/subcategories.model";
import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

type ProductEditSubcategoryIdFormProps = {
    subcategoriesName: SubcategoryName[]
}

export default function ProductEditSubcategoryIdForm({subcategoriesName}: ProductEditSubcategoryIdFormProps) {
    const {productId, productSubcategoryId, setProductSubcategoryId, productsApi} = useProductEditContext();
    const {updateProductSubcategoryMutation} = useProductMutations(productsApi);

    const handleSubcategoryIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductSubcategoryId(parseInt(event.target.value));
    };

    const handleSubmitChangeSubcategoryId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductSubcategoryMutation.mutate({id: productId, subcategoryId: productSubcategoryId});
    };

    return (
        <>
            <h6>Change subcategory</h6>
            <form onSubmit={handleSubmitChangeSubcategoryId}>
                <div className="mb-3">
                    <select className="form-select" id="formInputSubcategory"
                            value={productSubcategoryId}
                            onChange={handleSubcategoryIdChange}>
                        <option value="-1">Select Subcategory</option>
                        {Object.values(subcategoriesName).map(subcategoryName => (
                            <option key={subcategoryName.id} value={subcategoryName.id}>{subcategoryName.name}</option>
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