import {useCallback, useMemo} from "react";

import {Menu} from "../../models/menus.model.ts";
import {Product} from "../../models/products.model.ts";
import {OrderProduct} from "../../models/order.model.ts";
import {useOrderContext} from "../../contexts/OrderContext.tsx";

type OrderDetailsProps = {
    products: Product[];
    menus: Menu[];
}

const getProductDetails = (product: OrderProduct, products: Product[]) => {
    const productDetails = products.find(p => p.id === product.product_id);
    if (!productDetails) return {name: "", variantName: "", ingredientNames: "", price: "0.00"};

    const variant = product.variant_id !== undefined && productDetails.variants
        ? productDetails.variants.find(v => v.id === product.variant_id)
        : undefined;

    const ingredients = product.ingredients.map(ingredient => {
        const i = productDetails.ingredients?.find(i => i.id === ingredient.ingredient_id);

        if (!i) return "";

        return i.name + " x" + ingredient.quantity;
    }).filter(Boolean).join(', ');

    return {
        name: productDetails.name,
        variantName: variant ? variant.name : "",
        ingredientNames: ingredients ? `(${ingredients})` : "",
        price: product.price.toFixed(2),
    };
};

export default function OrderDetails({products, menus}: OrderDetailsProps) {
    const {orderProducts, setOrderProducts, orderMenus, setOrderMenus} = useOrderContext();

    const handleSubmitRemoveProduct = useCallback((index: number) => {
        setOrderProducts(prev => prev.filter((_, i) => i !== index));
    }, [setOrderProducts]);

    const handleSubmitRemoveMenu = useCallback((index: number) => {
        setOrderMenus(prev => prev.filter((_, i) => i !== index));
    }, [setOrderMenus]);

    const renderOrderProduct = useMemo(() => orderProducts.map((value, index) => {
        const {name, variantName, ingredientNames, price} = getProductDetails(value, products);
        return (
            <div className="row mb-2" key={index}>
                <div className="col-12 col-md-6 col-lg-7 d-flex flex-wrap align-items-center">
                    <strong>{name}</strong>
                    {variantName && <span className="text-muted fst-italic ms-2">{variantName}</span>}
                    {ingredientNames && <span className="text-secondary ms-2">{ingredientNames}</span>}
                </div>
                <div className="col-2 col-md-2 col-lg-1 d-flex align-items-center">{value.quantity}</div>
                <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">{price} €</div>
                <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
                    <button type="button" className="btn btn-danger" onClick={() => handleSubmitRemoveProduct(index)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        );
    }), [orderProducts, products, handleSubmitRemoveProduct]);

    const renderOrderMenu = useMemo(() => orderMenus.map((menu, menuIndex) => {
        const menuDetails = menus.find(m => m.id === menu.menu_id);
        if (!menuDetails) return null;

        return (
            <div key={menuIndex} className="row mb-2">
                <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="d-flex flex-column flex-wrap">
                        <strong>{menuDetails.name}</strong>
                        {menu.fields.map((field, fieldIndex) => (
                            <div key={fieldIndex} className="ms-3">
                                {field.products.map((product, productIndex) => {
                                    const {name, variantName, ingredientNames} = getProductDetails(product, products);
                                    return (
                                        <div key={productIndex} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <strong>{name} (x{product.quantity})</strong>
                                                <div>
                                                    {variantName && <span
                                                        className="text-muted fst-italic ms-2">{variantName}</span>}
                                                    {ingredientNames &&
                                                        <span className="text-secondary ms-2">{ingredientNames}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-2 col-md-2 col-lg-1 d-flex align-items-center">{menu.quantity}</div>
                <div
                    className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">{menu.price.toFixed(2)} €
                </div>
                <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
                    <button type="button" className="btn btn-danger" onClick={() => handleSubmitRemoveMenu(menuIndex)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        );
    }), [orderMenus, menus, products, handleSubmitRemoveMenu]);

    return (
        <div className="container-fluid">
            {renderOrderProduct}
            {renderOrderMenu}
        </div>
    );
}