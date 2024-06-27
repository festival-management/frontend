import React from "react";

import {Product} from "../../models/products.model.ts";

type OrderProductsTableElementProps = {
    product: Product;
}

export default function OrderProductsTableElement({product}: OrderProductsTableElementProps) {
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h4>{product.name}</h4>
                <h6><strong>Price:&nbsp;</strong>{product.price}</h6>
            </div>
        </div>
    );
}