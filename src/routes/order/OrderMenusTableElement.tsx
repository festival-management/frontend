import React, {useState} from "react";

import {Product} from "../../models/products.model.ts";
import {ToastType} from "../../models/toast-message.model.ts";
import {Menu, MenuFieldProduct} from "../../models/menus.model.ts";
import {OrderMenu, OrderMenuField} from "../../models/order.model.ts";
import VariantSelector from "../../components/variant-selector.tsx";
import IngredientsSelector from "../../components/ingredients-selector.tsx";

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

    const getProductVariantSelected = (fieldId: number, productId: number) => {
        const field = selectedFields.find(f => f.id === fieldId);

        if (!field) {
            return -1;
        }

        const product = field.products.find(p => p.id === productId);

        if (!product) {
            return -1;
        }

        return product.variant || -1;
    };

    const getProductIngredientsSelected = (fieldId: number, productId: number) => {
        const field = selectedFields.find(f => f.id === fieldId);

        if (!field) {
            return [];
        }

        const product = field.products.find(p => p.id === productId);

        if (!product) {
            return [];
        }

        return product.ingredients || [];
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

    const handleVariantSelection = (fieldId: number, productId: number, variantId: number) => {
        const updatedFields = [...selectedFields];

        const field = updatedFields.find(f => f.id === fieldId);
        const product = field?.products.find(p => p.id === productId);

        if (product) {
            product.variant = variantId;
        }

        setSelectedFields(updatedFields);
    };

    const handleIngredientSelection = (fieldId: number, productId: number, ingredientId: number, isSelected: boolean) => {
        const updatedFields = [...selectedFields];

        const fieldIndex = updatedFields.findIndex(f => f.id === fieldId);

        if (fieldIndex !== -1) {
            const productIndex = updatedFields[fieldIndex].products.findIndex(p => p.id === productId);

            if (productIndex !== -1) {
                updatedFields[fieldIndex].products[productIndex] = {
                    ...updatedFields[fieldIndex].products[productIndex],
                    ingredients: isSelected
                        ? [...(updatedFields[fieldIndex].products[productIndex].ingredients || []), ingredientId]
                        : (updatedFields[fieldIndex].products[productIndex].ingredients || []).filter(id => id !== ingredientId)
                };
            }
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
            return addToast("Please select at least one product for all required fields", "error");
        }

        for (const field of selectedFields) {
            for (const product of field.products) {
                const productDetails = getProductDetails(product.id);

                if (productDetails.variants && productDetails.variants.length > 0 && (!product.variant || product.variant === -1)) {
                    return addToast("Select a variant", "error");
                }
            }
        }

        await handleSubmitAddMenu({
            id: menu.id,
            fields: selectedFields,
            price: price
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
                    {menu.fields && menu.fields.map(field => (
                        <div key={field.id} className="mb-3">
                            <h5>
                                {field.name} {!field.is_optional && <span className="text-danger">*</span>}
                            </h5>
                            <div className="mb-2">
                                {field.products.map(fp => {
                                    const productDetails = getProductDetails(fp.product_id);
                                    return productDetails ? (
                                        <div key={fp.id} className="mb-3">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`product-${fp.id}`}
                                                    checked={isProductSelected(field.id, fp.product_id)}
                                                    onChange={(e) => handleProductSelection(field.id, fp, e.target.checked, field.max_sortable_elements)}
                                                />
                                                <label className="form-check-label" htmlFor={`product-${fp.id}`}>
                                                    {productDetails.name}
                                                </label>
                                            </div>
                                            <div className="ms-4">
                                                {productDetails.variants && productDetails.variants.length > 0 && (
                                                    <div className="mt-2">
                                                        <VariantSelector
                                                            variants={productDetails.variants}
                                                            selectedVariantId={getProductVariantSelected(field.id, fp.product_id)}
                                                            onVariantChange={(variantId) => handleVariantSelection(field.id, fp.product_id, variantId)}
                                                        />
                                                    </div>
                                                )}
                                                {productDetails.ingredients && productDetails.ingredients.length > 0 && (
                                                    <div className="mt-2">
                                                        <IngredientsSelector
                                                            ingredients={productDetails.ingredients}
                                                            selectedIngredientIds={getProductIngredientsSelected(field.id, fp.product_id)}
                                                            onIngredientChange={(ingredientId, isSelected) => handleIngredientSelection(field.id, fp.product_id, ingredientId, isSelected)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    ))}
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}