import React, {useEffect, useState} from "react";

import {Product} from "../../models/products.model.ts";
import {ToastType} from "../../models/toast-message.model.ts";
import {Menu, MenuFieldProduct} from "../../models/menus.model.ts";
import VariantSelector from "../../components/variant-selector.tsx";
import {OrderMenu, OrderMenuField} from "../../models/order.model.ts";
import QuantitySelector from "../../components/quantity-selector.tsx";
import IngredientsSelector from "../../components/ingredients-selector.tsx";

type OrderMenusTableElementProps = {
    menu: Menu;
    products: Product[];
    addToast: (message: string, type: ToastType) => void;
    handleSubmitAddMenu: (menu: OrderMenu) => Promise<void>;
}

export default function OrderMenusTableElement({menu, products, addToast, handleSubmitAddMenu}: OrderMenusTableElementProps) {
    const [price, setPrice] = useState(menu.price);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedFields, setSelectedFields] = useState<OrderMenuField[]>([]);

    const getProductDetails = (productId: number) => {
        return products.find(product => product.id === productId);
    };

    const isProductSelected = (fieldId: number, productId: number) => {
        const field = selectedFields.find(f => f.menu_field_id === fieldId);
        return field ? field.products.some(p => p.product_id === productId) : false;
    };

    const getProductVariantSelected = (fieldId: number, productId: number) => {
        const field = selectedFields.find(f => f.menu_field_id === fieldId);

        if (!field) {
            return -1;
        }

        const product = field.products.find(p => p.product_id === productId);

        if (!product) {
            return -1;
        }

        return product.variant_id || -1;
    };

    const getProductIngredientsSelected = (fieldId: number, productId: number) => {
        const field = selectedFields.find(f => f.menu_field_id === fieldId);

        if (!field) {
            return [];
        }

        const product = field.products.find(p => p.product_id === productId);

        if (!product) {
            return [];
        }

        return product.ingredients || [];
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedQuantity(parseInt(event.target.value));
    };

    const handleProductSelection = (fieldId: number, product: MenuFieldProduct, isSelected: boolean, maxElements: number) => {
        const updatedFields = [...selectedFields];
        const fieldIndex = updatedFields.findIndex(field => field.menu_field_id === fieldId);

        if (fieldIndex >= 0) {
            const field = updatedFields[fieldIndex];
            if (isSelected) {
                if (field.products.length < maxElements) {
                    field.products.push({product_id: product.product_id, price: product.price});
                } else {
                    return addToast(`You can select up to ${maxElements} products for this field`, "error");
                }
            } else {
                field.products = field.products.filter(p => p.product_id !== product.product_id);
            }
        } else if (isSelected) {
            updatedFields.push({
                menu_field_id: fieldId,
                products: [{product_id: product.product_id, price: product.price}]
            });
        }

        setSelectedFields(updatedFields);
    };

    const handleVariantSelection = (fieldId: number, productId: number, variantId: number) => {
        const updatedFields = [...selectedFields];

        const field = updatedFields.find(f => f.menu_field_id === fieldId);
        const product = field?.products.find(p => p.product_id === productId);

        if (product) {
            product.variant_id = variantId;
        }

        setSelectedFields(updatedFields);
    };

    const handleIngredientSelection = (fieldId: number, productId: number, ingredientId: number, isSelected: boolean) => {
        const updatedFields = [...selectedFields];

        const fieldIndex = updatedFields.findIndex(f => f.menu_field_id === fieldId);

        if (fieldIndex !== -1) {
            const productIndex = updatedFields[fieldIndex].products.findIndex(p => p.product_id === productId);

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
            const selectedField = selectedFields.find(f => f.menu_field_id === field.id);
            return selectedField && selectedField.products.length > 0;
        });

        if (!allRequiredFieldsSelected) {
            return addToast("Please select at least one product for all required fields", "error");
        }

        for (const field of selectedFields) {
            for (const product of field.products) {
                const productDetails = getProductDetails(product.product_id);

                if (productDetails.variants && productDetails.variants.length > 0 && (!product.variant_id || product.variant_id === -1)) {
                    return addToast("Select a variant", "error");
                }
            }
        }

        await handleSubmitAddMenu({
            menu_id: menu.id,
            fields: selectedFields,
            quantity: selectedQuantity,
            price: price
        });

        setPrice(menu.price);
        setSelectedQuantity(1);
        setSelectedFields([]);
    };

    useEffect(() => {
        let basePrice = menu.price;

        selectedFields.forEach(field => {
            field.products.forEach(product => {
                basePrice += product.price;

                const productDetails = getProductDetails(product.product_id);

                if (product.variant_id && productDetails) {
                    const selectedVariant = productDetails.variants!.find(v => v.id === product.variant_id);
                    if (selectedVariant) {
                        basePrice += selectedVariant.price;
                    }
                }

                if (product.ingredients && productDetails) {
                    const ingredientsPrice = product.ingredients.reduce((total, id) => {
                        const ingredient = productDetails.ingredients!.find(ing => ing.id === id);
                        return ingredient ? total + ingredient.price : total;
                    }, 0);
                    basePrice += ingredientsPrice;
                }
            });
        });

        setPrice(basePrice * selectedQuantity);
    }, [selectedQuantity, selectedFields, menu, getProductDetails]);

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">{menu.name}</h4>
                    <h6 className="mb-0"><strong>Price:&nbsp;</strong>{price.toFixed(2)} €</h6>
                </div>
                <div className="mt-2">
                    <QuantitySelector index={menu.id} quantity={selectedQuantity}
                                      handleQuantityChange={handleQuantityChange}/>
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
                                                            index={productDetails.id}
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