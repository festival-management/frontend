import React from "react";

import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditDailyMaxSales() {
    const {productId, productDailyMaxSales, setProductDailyMaxSales, productsApi} = useProductEditContext();
    const {updateProductDailyMaxSalesMutation} = useProductMutations(productsApi);

    const handleDailyMaxSalesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setProductDailyMaxSales(value === '' ? null : parseInt(value));
    };

    const handleSubmitChangeDailyMaxSales = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductDailyMaxSalesMutation.mutate({id: productId, dailyMaxSales: productDailyMaxSales});
    };

    return (
        <>
            <h6>Change daily max sales</h6>
            <form onSubmit={handleSubmitChangeDailyMaxSales}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputDailyMaxSales"
                        placeholder="Input the daily max sales of product"
                        min="0"
                        value={productDailyMaxSales === null ? '' : productDailyMaxSales}
                        onChange={handleDailyMaxSalesChange}
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