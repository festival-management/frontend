import BaseResponse from "./base.model.ts";

export interface OrderProductIngredient {
    ingredient_id: number;
    quantity: number;
}

export interface OrderProduct {
    product_id: number;
    variant_id?: number;
    ingredients: OrderProductIngredient[];
    quantity: number;
    price: number;
}

export interface OrderMenuField {
    menu_field_id: number;
    products: OrderProduct[];
}

export interface OrderMenu {
    menu_id: number;
    fields: OrderMenuField[];
    quantity: number;
    price: number;
}

export interface Order {
    products: OrderProduct[];
    menus: OrderMenu[];
}

// Interface for the useOrdersApi hook
export interface UseOrdersApiInterface {
    addOrder(customer: string, guests: number | null, isTakeAway: boolean, table: number | null, products: OrderProduct[], menus: OrderMenu[]): Promise<BaseResponse>;
}
