import React, {useEffect, useState} from "react";

import {Menu} from "../../models/menus.model.ts";
import {Order} from "../../models/order.model.ts";
import {Product} from "../../models/products.model.ts";

type OrderDetailsProps = {
    order: Order;
    products: Product[];
    menus: Menu[];
    handleSubmitRemoveProduct: (index: number) => Promise<void>;
}

export default function OrderDetails({order, products, menus, handleSubmitRemoveProduct}: OrderDetailsProps) {
    const [orderProducts, setOrderProducts] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const newOrderProducts = order.products.map((value, index) => {
            const product = products.find(p => p.id === value.id);

            let variantName = "";
            let ingredientNames = "";

            if (value.variant !== undefined) {
                const variant = product.variants!.find(v => v.id === value.variant);
                if (variant) {
                    variantName = variant.name;
                }
            }

            if (value.ingredients && value.ingredients.length > 0) {
                const ingredients = value.ingredients.map(ingredientId => {
                    const ingredient = product.ingredients!.find(i => i.id === ingredientId);
                    return ingredient ? ingredient.name : "";
                });
                ingredientNames = `(${ingredients.join(', ')})`;
            }

            return (
                <div className="row mb-2" key={index}>
                    <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center">
                        <strong>{product?.name}</strong>
                        {variantName && <span className="text-muted fst-italic ms-2">{variantName}</span>}
                        {ingredientNames && <span className="text-secondary ms-2">{ingredientNames}</span>}
                    </div>
                    <div className="col-6 col-md-3 col-lg-2 d-flex align-items-center justify-content-end">
                        {value.price.toFixed(2)} €
                    </div>
                    <div className="col-6 col-md-3 col-lg-3 text-end">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleSubmitRemoveProduct(index)}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            );
        });

        setOrderProducts(newOrderProducts);
    }, [handleSubmitRemoveProduct, order, products]);

    return (
        <div className="container-fluid">
            {orderProducts}
        </div>
    );
}