import React from "react";

import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditShortNameForm() {
    const {productId, productShortName, setProductShortName, productsApi} = useProductEditContext();
    const {updateProductShortNameMutation} = useProductMutations(productsApi);

    const handleShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductShortName(event.target.value);
    };

    const handleSubmitChangeShortName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductShortNameMutation.mutate({id: productId, shortName: productShortName});
    };

    return (
        <>
            <h6>Change short name</h6>
            <form onSubmit={handleSubmitChangeShortName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputShortName"
                        placeholder="Input the short name of product"
                        value={productShortName}
                        onChange={handleShortNameChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}