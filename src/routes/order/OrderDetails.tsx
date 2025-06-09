import {useCallback, useEffect, useMemo, useRef} from "react";

import {Menu} from "../../models/menus.model.ts";
import {Product} from "../../models/products.model.ts";
import {CreateOrderProduct} from "../../models/order.model.ts";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import QuantitySelector from "../../components/quantity-selector.tsx";

type OrderDetailsProps = {
    products: Product[];
    menus: Menu[];
    coverCharge: number;
}

const getProductDetails = (product: CreateOrderProduct, products: Product[]) => {
    const productDetails = products.find(p => p.id === product.product_id);
    if (!productDetails) return {name: "", variantName: "", ingredientNames: "", price: "0.00"};

    const variant = product.variant_id !== undefined && productDetails.variants
        ? productDetails.variants.find(v => v.id === product.variant_id)
        : undefined;

    const ingredients = product.ingredients.map(ingredient => {
        const i = productDetails.ingredients?.find(i => i.id === ingredient.ingredient_id);

        if (!i) return "";

        return i.name;
    }).filter(Boolean).join(', ');

    return {
        name: productDetails.name,
        variantName: variant ? variant.name : "",
        ingredientNames: ingredients ? `(${ingredients})` : "",
        price: product.price.toFixed(2),
    };
};

export default function OrderDetails({products, menus, coverCharge}: OrderDetailsProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const {orderGuests, orderIsTakeAway, orderProducts, setOrderProducts, orderMenus, setOrderMenus} = useOrderContext();

    const handleSubmitRemoveProduct = useCallback((index: number) => {
        setOrderProducts(prev => prev.filter((_, i) => i !== index));
    }, [setOrderProducts]);

    const handleSubmitRemoveMenu = useCallback((index: number) => {
        setOrderMenus(prev => prev.filter((_, i) => i !== index));
    }, [setOrderMenus]);

    const handleProductMenuQuantityChange = useCallback((index: number, isProduct: boolean) => {
        return (change: number) => {
            if (isProduct) {
                setOrderProducts(prev =>
                    prev.map((product, i) => {
                        if (i !== index) return product;
                        const newQuantity = product.quantity + change;
                        if (newQuantity < 1) return product;
                        const unitPrice = product.price / product.quantity;
                        return {
                            ...product,
                            quantity: newQuantity,
                            price: unitPrice * newQuantity,
                        };
                    })
                );
            } else {
                setOrderMenus(prev =>
                    prev.map((menu, i) => {
                        if (i !== index) return menu;
                        const newQuantity = menu.quantity + change;
                        if (newQuantity < 1) return menu;
                        const unitPrice = menu.price / menu.quantity;
                        return {
                            ...menu,
                            quantity: newQuantity,
                            price: unitPrice * newQuantity,
                        };
                    })
                );
            }
        }
    }, [setOrderProducts, setOrderMenus]);

    const renderOrderProduct = useMemo(() => orderProducts.map((value, index) => {
        const {name, variantName, ingredientNames, price} = getProductDetails(value, products);
        return (
            <div className="row mb-2" key={index}>
                <div className="col-12 col-md-6 col-lg-5 d-flex flex-wrap align-items-center">
                    <strong>{name}</strong>
                    {variantName && <span className="text-muted fst-italic ms-2">{variantName}</span>}
                    {ingredientNames && <span className="text-secondary ms-2">{ingredientNames}</span>}
                </div>
                <div className="col-2 col-md-2 col-lg-3 d-flex align-items-center justify-content-center">
                    <QuantitySelector quantity={value.quantity} handleQuantityChange={handleProductMenuQuantityChange(index, true)} minValue={1}/>
                </div>
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
                <div className="col-12 col-md-5 col-lg-5 d-flex align-items-center">
                    <div className="d-flex flex-column flex-wrap">
                        <strong>{menuDetails.name}</strong>
                        {menu.fields.map((field, fieldIndex) => (
                            <div key={fieldIndex} className="ms-3">
                                {field.products.map((product, productIndex) => {
                                    const menuData = menus.find((m) => m.id === menu.menu_id);
                                    const fieldData = menuData?.fields?.find((f) => f.id === field.menu_field_id);
                                    const field_products = fieldData?.products?.map((product) => product.product) || [];

                                    const {
                                        name,
                                        variantName,
                                        ingredientNames
                                    } = getProductDetails(product, field_products);
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
                <div className="col-2 col-md-2 col-lg-3 d-flex align-items-center justify-content-center">
                    <QuantitySelector quantity={menu.quantity} handleQuantityChange={handleProductMenuQuantityChange(menuIndex, false)} minValue={1}/>
                </div>
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

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [orderProducts, orderMenus]);

    return (
        <div className="container-fluid">
            {!orderIsTakeAway &&
                <div className="row mb-2">
                    <div className="col-12 col-md-6 col-lg-5 d-flex flex-wrap align-items-center">
                        <strong>Coperti</strong>
                    </div>
                    <div className="col-2 col-md-2 col-lg-3 d-flex align-items-center justify-content-center">
                        {orderGuests}
                    </div>
                    <div className="col-5 col-md-2 col-lg-2 d-flex align-items-center justify-content-end">
                        {(orderGuests * coverCharge).toFixed(2)} €
                    </div>
                </div>
            }
            {renderOrderProduct}
            {renderOrderMenu}
            <div ref={bottomRef} />
        </div>
    );
}