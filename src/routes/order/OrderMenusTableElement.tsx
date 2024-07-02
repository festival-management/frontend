import React, {useState} from "react";

import {Product} from "../../models/products.model.ts";
import {ToastType} from "../../models/toast-message.model.ts";
import {Menu, MenuFieldProduct} from "../../models/menus.model.ts";
import {OrderMenu, OrderMenuField} from "../../models/order.model.ts";

type OrderMenusTableElementProps = {
    menu: Menu;
    products: Product[];
    addToast: (message: string, type: ToastType) => void;
    handleSubmitAddMenu: (menu: OrderMenu) => Promise<void>;
}

export default function OrderMenusTableElement({menu, products, addToast, handleSubmitAddMenu}: OrderMenusTableElementProps) {
    const [price, setPrice] = useState(menu.price);
    const [selectedFields, setSelectedFields] = useState<OrderMenuField[]>([]);

    const getProductDetails = (productId: number) => {
        return products.find(product => product.id === productId);
    };

    const isProductSelected = (fieldId: number, productId: number) => {
        const field = selectedFields.find(f => f.id === fieldId);
        return field ? field.products.some(p => p.id === productId) : false;
    };

    const handleProductSelection = (fieldId: number, product: MenuFieldProduct, isSelected: boolean, maxElements: number) => {
        const updatedFields = [...selectedFields];
        const fieldIndex = updatedFields.findIndex(field => field.id === fieldId);

        if (fieldIndex >= 0) {
            const field = updatedFields[fieldIndex];
            if (isSelected) {
                if (field.products.length < maxElements) {
                    field.products.push({ id: product.product_id, price: product.price });
                } else {
                    return addToast(`You can select up to ${maxElements} products for this field`, "error");
                }
            } else {
                field.products = field.products.filter(p => p.id !== product.product_id);
            }
        } else if (isSelected) {
            updatedFields.push({
                id: fieldId,
                products: [{ id: product.product_id, price: product.price }]
            });
        }

        if (product.price > 0) {
            setPrice((prevState) => isSelected ? prevState + product.price : prevState - product.price);
        }

        setSelectedFields(updatedFields);
    };

    const handleSubmit = async () => {
        const requiredFields = menu.fields!.filter(field => !field.is_optional) || [];
        const allRequiredFieldsSelected = requiredFields.every(field => {
            const selectedField = selectedFields.find(f => f.id === field.id);
            return selectedField && selectedField.products.length > 0;
        });

        if (!allRequiredFieldsSelected) {
            addToast("Please select at least one product for all required fields", "error");
        }

        await handleSubmitAddMenu({
            id: menu.id,
            fields: selectedFields
        });

        setPrice(menu.price);
        setSelectedFields([]);
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">{menu.name}</h4>
                    <h6 className="mb-0"><strong>Price:&nbsp;</strong>{price.toFixed(2)} €</h6>
                </div>
                <div className="mt-2">
                    <div className="mb-3">
                        {menu.fields?.map(field => (
                            <div key={field.id} className="mb-3">
                                <h5>
                                    {field.name} {!field.is_optional && <span className="text-danger">*</span>}
                                </h5>
                                <div>
                                    {field.products.map(product => {
                                        const productDetails = getProductDetails(product.product_id);
                                        return (
                                            <div key={`${field.id}-${product.product_id}`} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={product.product_id}
                                                    id={`field-${field.id}-product-${product.product_id}`}
                                                    checked={isProductSelected(field.id, product.product_id)}
                                                    onChange={(e) => handleProductSelection(field.id, product, e.target.checked, field.max_sortable_elements)}
                                                />
                                                <label className="form-check-label"
                                                       htmlFor={`field-${field.id}-product-${product.product_id}`}>
                                                    {productDetails!.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}