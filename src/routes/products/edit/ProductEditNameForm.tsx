import React from "react";

import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditNameForm() {
    const {productId, productName, setProductName, productsApi} = useProductEditContext();
    const {updateProductNameMutation} = useProductMutations(productsApi);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductNameMutation.mutate({id: productId, name: productName});
    };

    return (
        <>
            <h6>Change name</h6>
            <form onSubmit={handleSubmitChangeName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputName"
                        placeholder="Input the name of product"
                        value={productName}
                        onChange={handleNameChange}
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