import {useEffect, useReducer, useState} from "react";

import {Menu} from "../../models/menus.model.ts";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import {selectedFieldsReducer} from "../../contexts/orderReducer.ts";
import QuantitySelector from "../../components/quantity-selector.tsx";
import OrderMenusFieldProductTableElement from "./OrderMenusFieldProductTableElement.tsx";

type OrderMenusTableElementProps = {
    menu: Menu;
}

export default function OrderMenusTableElement({menu}: OrderMenusTableElementProps) {
    const [price, setPrice] = useState(menu.price);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
    const [selectedFields, selectedFieldsDispatch] = useReducer(selectedFieldsReducer, []);
    const [resetTrigger, setResetTrigger] = useState(0);

    const {addMenu} = useOrderContext();
    const {addToast} = useToastContext();

    const handleQuantityChange = (change: number) => {
        setSelectedQuantity((prevState) => prevState + change);
    };

    const getProductDetails = (fieldId: number, productId: number) => {
        return menu.fields
            ?.find(field => field.id === fieldId)
            ?.products
            ?.find(product => product.id === productId)
            ?.product;
    };

    const handleSubmit = async () => {
        if (!selectedQuantity) {
            return addToast(ErrorCodes.MENU_QUANTITY_CANNOT_BE_ZERO, "error");
        }

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

        addMenu({
            menu_id: menu.id,
            fields: selectedFields,
            quantity: selectedQuantity,
            price: price
        });

        setPrice(menu.price);
        setSelectedQuantity(0);
        selectedFieldsDispatch({type: "RESET"});
        setResetTrigger(prev => prev + 1);
    };

    useEffect(() => {
        let basePrice = menu.price;

        selectedFields.forEach(field => {
            field.products.forEach(product => {
                basePrice += product.price;
            });

            const fieldData = menu.fields!.find(f => f.id === field.menu_field_id);
            const totalFieldQuantity = field.products.reduce((sum, value) => sum + value.quantity, 0);

            if (fieldData && totalFieldQuantity > fieldData.max_sortable_elements) {
                basePrice += fieldData.additional_cost * (totalFieldQuantity - fieldData.max_sortable_elements);
            }
        });

        let newPrice = basePrice * selectedQuantity;
        if (selectedQuantity === 0) {
            newPrice = menu.price;
        }

        setPrice(newPrice);
    }, [selectedQuantity, selectedFields, menu]);

    console.log(menu)

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <h4 className="mb-0 text-break">{menu.name}</h4>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-start">
                        <QuantitySelector quantity={selectedQuantity} handleQuantityChange={handleQuantityChange}/>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <h6><strong>Price:&nbsp;</strong>{price.toFixed(2)} €</h6>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="row">
                        {menu.fields && menu.fields.map(field => (
                            <div key={field.id} className="col-lg-4 col-12 mb-2">
                                <div className="mb-3">
                                    <h5>
                                        {field.name} {!field.is_optional && <span className="text-danger">*</span>}
                                    </h5>
                                    <div className="mb-2">
                                        {field.products?.map(fp => {
                                            return <OrderMenusFieldProductTableElement
                                                key={`${field.id}-${fp.product.id}`}
                                                fieldId={field.id}
                                                product={fp.product}
                                                dispatch={selectedFieldsDispatch}
                                                resetTrigger={resetTrigger}
                                            />
                                        })}
                                    </div>
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