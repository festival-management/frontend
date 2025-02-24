import {CreateOrderMenuField, CreateOrderProduct} from "../models/order.model.ts";

export type SelectedFieldsReducerAction =
    | { type: "ADD_OR_UPDATE_PRODUCT"; fieldId: number; product: CreateOrderProduct }
    | { type: "REMOVE_PRODUCT"; fieldId: number; productId: number }
    | { type: "RESET" };

export function selectedFieldsReducer(state: CreateOrderMenuField[], action: SelectedFieldsReducerAction) {
    switch (action.type) {
        case "ADD_OR_UPDATE_PRODUCT": {
            const fieldIndex = state.findIndex(field => field.menu_field_id === action.fieldId);
            if (fieldIndex !== -1) {
                return state.map(field =>
                    field.menu_field_id === action.fieldId
                        ? {
                            ...field,
                            products: field.products.some(p => p.product_id === action.product.product_id)
                                ? field.products.map(p => p.product_id === action.product.product_id ? action.product : p)
                                : [...field.products, action.product]
                        }
                        : field
                );
            } else {
                return [
                    ...state,
                    {
                        menu_field_id: action.fieldId,
                        products: [action.product]
                    }
                ];
            }
        }
        case "REMOVE_PRODUCT":
            return state
                .map(field =>
                    field.menu_field_id === action.fieldId
                        ? {...field, products: field.products.filter(p => p.product_id !== action.productId)}
                        : field
                )
                .filter(field => field.products.length > 0);
        case "RESET":
            return [];
        default:
            return state;
    }
}