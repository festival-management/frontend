import React from "react";

import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditPriorityForm() {
    const {productId, productPriority, setProductPriority, productsApi} = useProductEditContext();
    const {updateProductPriorityMutation} = useProductMutations(productsApi);

    const handlePriorityChange = () => {
        setProductPriority((v) => !v);
    };

    const handleSubmitChangePriority = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductPriorityMutation.mutate({id: productId, priority: productPriority});
    };

    return (
        <>
            <h6>Change priority</h6>
            <form onSubmit={handleSubmitChangePriority}>
                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="formInputPriority" checked={productPriority}
                               onChange={handlePriorityChange}/>
                        <label className="form-check-label" htmlFor="formInputPriority">
                            Is priority?
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}