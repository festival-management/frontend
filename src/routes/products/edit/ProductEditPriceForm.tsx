import React from "react";

import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditPriceForm() {
    const {productId, productPrice, setProductPrice, productsApi} = useProductEditContext();
    const {updateProductPriceMutation} = useProductMutations(productsApi);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(parseFloat(event.target.value));
    };

    const handleSubmitChangePrice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductPriceMutation.mutate({id: productId, price: productPrice});
    };

    return (
        <>
            <h6>Change price</h6>
            <form onSubmit={handleSubmitChangePrice}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputPrice"
                        placeholder="Input the price of product"
                        min="0"
                        step="0.01"
                        value={productPrice}
                        onChange={handlePriceChange}
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