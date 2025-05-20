import React from "react";

import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditOrderForm() {
    const {productId, productOrder, setProductOrder, productsApi} = useProductEditContext();
    const {updateProductOrderMutation} = useProductMutations(productsApi);

    const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductOrder(parseInt(event.target.value));
    };

    const handleSubmitChangeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductOrderMutation.mutate({id: productId, order: productOrder});
    };

    return (
        <>
            <h6>Change order</h6>
            <form onSubmit={handleSubmitChangeOrder}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputOrder"
                        placeholder="Input the order of product"
                        min="0"
                        value={productOrder}
                        onChange={handleOrderChange}
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