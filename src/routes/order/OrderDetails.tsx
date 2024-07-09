import React, {useEffect, useState} from "react";

import {Menu} from "../../models/menus.model.ts";
import {Product} from "../../models/products.model.ts";
import {Order, OrderProduct} from "../../models/order.model.ts";

type OrderDetailsProps = {
    order: Order;
    products: Product[];
    menus: Menu[];
    handleSubmitRemoveProduct: (index: number) => Promise<void>;
    handleSubmitRemoveMenu: (index: number) => Promise<void>;
}

const getProductDetails = (product: OrderProduct, products: Product[]) => {
    const productDetails = products.find(p => p.id === product.product_id);
    let variantName = "";
    let ingredientNames = "";

    if (product.variant_id !== undefined) {
        const variant = productDetails?.variants!.find(v => v.id === product.variant_id);
        if (variant) {
            variantName = variant.name;
        }
    }

    if (product.ingredients && product.ingredients.length > 0) {
        const ingredients = product.ingredients.map(ingredientId => {
            const ingredient = productDetails?.ingredients!.find(i => i.id === ingredientId);
            return ingredient ? ingredient.name : "";
        });
        ingredientNames = `(${ingredients.join(', ')})`;
    }

    return {
        name: productDetails?.name || "",
        variantName,
        ingredientNames,
        price: product.price.toFixed(2),
    };
};

export default function OrderDetails({order, products, menus, handleSubmitRemoveProduct, handleSubmitRemoveMenu}: OrderDetailsProps) {
    const [orderProducts, setOrderProducts] = useState<React.JSX.Element[]>([]);
    const [orderMenus, setOrderMenus] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const newOrderProducts = order.products.map((value, index) => {
            const { name, variantName, ingredientNames, price } = getProductDetails(value, products);

            return (
                <div className="row mb-2" key={index}>
                    <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center">
                        <strong>{name}</strong>
                        {variantName && <span className="text-muted fst-italic ms-2">{variantName}</span>}
                        {ingredientNames && <span className="text-secondary ms-2">{ingredientNames}</span>}
                    </div>
                    <div className="col-2 col-md-2 col-lg-1 d-flex align-items-center">
                        {value.quantity}
                    </div>
                    <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
                        {price} €
                    </div>
                    <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
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
    }, [handleSubmitRemoveProduct, order.products, products]);

    useEffect(() => {
        setOrderMenus(order.menus.map((menu, menuIndex) => {
            const menuDetails = menus.find(m => m.id === menu.menu_id);

            return (
                <div key={menuIndex} className="row mb-2">
                    <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="d-flex flex-column">
                            <strong>{menuDetails.name}</strong>
                            {menu.fields.map((field, fieldIndex) => (
                                <div key={fieldIndex} className="ms-3">
                                    {field.products.map((product, productIndex) => {
                                        const {
                                            name,
                                            variantName,
                                            ingredientNames
                                        } = getProductDetails(product, products);

                                        return (
                                            <div key={productIndex} className="mb-2">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <strong>{name}</strong>
                                                    <div>
                                                        {variantName &&
                                                            <span
                                                                className="text-muted fst-italic ms-2">{variantName}</span>}
                                                        {ingredientNames &&
                                                            <span
                                                                className="text-secondary ms-2">{ingredientNames}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-2 col-md-2 col-lg-1 d-flex align-items-center">
                        {menu.quantity}
                    </div>
                    <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
                        {menu.price.toFixed(2)} €
                    </div>
                    <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleSubmitRemoveMenu(menuIndex)}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            );
        }));
    }, [order.menus, menus, products, handleSubmitRemoveMenu]);

    return (
        <div className="container-fluid">
            {orderProducts}
            {orderMenus}
        </div>
    );
}