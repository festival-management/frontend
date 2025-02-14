import React from "react";

import {Product} from "../../models/products.model.ts";
import {OrderProduct} from "../../models/order.model.ts";
import ProductSelection from "../../components/product-selection.tsx";
import {SelectedFieldsReducerAction} from "../../contexts/orderReducer.ts";

interface OrderMenusFieldProductTableElementProps {
    fieldId: number;
    product: Product;
    dispatch: React.ActionDispatch<[action: SelectedFieldsReducerAction]>;
    resetTrigger: number;
}

export default function OrderMenusFieldProductTableElement({
                                                               fieldId,
                                                               product,
                                                               dispatch,
                                                               resetTrigger
                                                           }: OrderMenusFieldProductTableElementProps) {
    const updateProductInState = (orderProduct: OrderProduct) => {
        if (orderProduct.quantity > 0) {
            dispatch({
                type: "ADD_OR_UPDATE_PRODUCT",
                fieldId,
                product: orderProduct
            });
        } else {
            dispatch({
                type: "REMOVE_PRODUCT",
                fieldId,
                productId: product.id
            });
        }
    };

    return (
        <ProductSelection product={product} isFromMenu={true} updateProductInState={updateProductInState}
                          resetTrigger={resetTrigger}/>
    );
}