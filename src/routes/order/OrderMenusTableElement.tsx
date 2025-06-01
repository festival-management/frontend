import {useEffect, useReducer, useState} from "react";

import {Menu} from "../../models/menus.model.ts";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import {selectedFieldsReducer} from "../../contexts/orderReducer.ts";
import OrderMenusFieldProductTableElement from "./OrderMenusFieldProductTableElement.tsx";

type OrderMenusTableElementProps = {
    menu: Menu;
}

export default function OrderMenusTableElement({menu}: OrderMenusTableElementProps) {
    const [price, setPrice] = useState(menu.price);
    const [selectedFields, selectedFieldsDispatch] = useReducer(selectedFieldsReducer, []);
    const [resetTrigger, setResetTrigger] = useState(0);

    const {addMenu} = useOrderContext();
    const {addToast} = useToastContext();

    const getProductDetails = (fieldId: number, productId: number) => {
        return menu.fields
            ?.find(field => field.id === fieldId)
            ?.products
            ?.find(product => product.product.id === productId)
            ?.product;
    };

    const handleSubmit = async () => {
        const requiredFields = menu.fields!.filter(field => !field.is_optional);
        const allRequiredFieldsSelected = requiredFields.every(field => {
            const selectedField = selectedFields.find(f => f.menu_field_id === field.id);
            return selectedField && selectedField.products.length > 0;
        });

        if (!allRequiredFieldsSelected) {
            return addToast(ErrorCodes.MISSING_OBLIGATORY_MENU_FIELDS, "error");
        }

        const hasInvalidProduct = selectedFields.some(field =>
            field.products.some(product => {
                const productDetails = getProductDetails(field.menu_field_id, product.product_id);
                return productDetails && productDetails.variants && productDetails.variants.length > 0 && !product.variant_id;
            })
        );

        if (hasInvalidProduct) {
            return addToast(ErrorCodes.INPUT_MENU_FIELD_PRODUCT_VARIANT, "error");
        }

        for (const field of selectedFields) {
            const menuField = menu.fields?.find(f => f.id === field.menu_field_id);

            if (menuField) {
                const maxSortableElements = menuField.max_sortable_elements;
                const canExceedMaxSortable = menuField.can_exceed_max_sortable;
                const totalQuantity = field.products.reduce((sum, value) => sum + value.quantity, 0);

                if (!canExceedMaxSortable && totalQuantity > maxSortableElements) {
                    return addToast(ErrorCodes.MENU_FIELD_PRODUCT_QUANTITY_EXCEEDED, "error");
                }
            }
        }

        addMenu({
            menu_id: menu.id,
            fields: selectedFields,
            quantity: 1,
            price: price
        });

        setPrice(menu.price);
        selectedFieldsDispatch({type: "RESET"});
        setResetTrigger(prev => prev + 1);
    };

    useEffect(() => {
        let basePrice = menu.price;

        selectedFields.forEach(field => {
            field.products.forEach(product => {
                basePrice += (menu.fields?.find(f => f.id === field.menu_field_id)?.products?.find(p => p.product.id === product.product_id)?.price || 0) * product.quantity;
                basePrice += product.price;
            });

            const fieldData = menu.fields!.find(f => f.id === field.menu_field_id);
            const totalFieldQuantity = field.products.reduce((sum, value) => sum + value.quantity, 0);

            if (fieldData && totalFieldQuantity > fieldData.max_sortable_elements) {
                basePrice += fieldData.additional_cost * (totalFieldQuantity - fieldData.max_sortable_elements);
            }
        });

        setPrice(basePrice);
    }, [selectedFields, menu]);

    const totalProducts = menu.fields
        ?.flatMap(field => field.products || [])
        .length;

    return (
        <>
            {menu.fields && menu.fields.map((field, i) =>
                field.products?.map((fp, y) => {
                    const isFirstProduct = i === 0 && y === 0;
                    const isFirstInField = y === 0;
                    return (
                        <tr key={`${field.id}-${fp.product.id}`}>
                            {isFirstProduct && (
                                <td className="align-middle" rowSpan={totalProducts}>{menu.name}</td>
                            )}
                            {isFirstInField && (
                                <td className="align-middle" rowSpan={field.products?.length || 1}>{field.name}</td>
                            )}
                            <OrderMenusFieldProductTableElement
                                product={fp.product}
                                fieldId={field.id}
                                dispatch={selectedFieldsDispatch}
                                resetTrigger={resetTrigger}
                            />
                            {isFirstProduct && (
                                <>
                                    <td className="align-middle" rowSpan={totalProducts}>{price.toFixed(2)} €</td>
                                    <td className="align-middle" rowSpan={totalProducts}>
                                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    );
                })
            )}
        </>
    );
}