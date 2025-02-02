import React, {useState, useEffect} from "react";

import useSubcategoriesApi from "../../../api/subcategories.ts";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import {SubcategoryName} from "../../../models/subcategories.model";
import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";
import useSubcategoryQueries from "../../../hooks/queries/use-subcategory-queries.ts";

export default function ProductEditSubcategoryIdForm() {
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);

    const {addToast} = useToastContext();
    const subcategoriesApi = useSubcategoriesApi();
    const {productId, productSubcategoryId, setProductSubcategoryId, productsApi} = useProductEditContext();

    const {fetchSubcategoriesName} = useSubcategoryQueries(subcategoriesApi);
    const {updateProductSubcategoryMutation} = useProductMutations(productsApi);

    const subcategoriesNameData = fetchSubcategoriesName("order");

    const handleSubcategoryIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductSubcategoryId(parseInt(event.target.value));
    };

    const handleSubmitChangeSubcategoryId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductSubcategoryMutation.mutate({id: productId, subcategoryId: productSubcategoryId});
    };

    useEffect(() => {
        if (!subcategoriesNameData) return;

        if (subcategoriesNameData.error) return addToast(subcategoriesNameData.code, "error");

        setSubcategoriesName(subcategoriesNameData.subcategories!);
    }, [subcategoriesNameData]);

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