
export interface OrderProduct {
    product_id: number;
    variant_id?: number;
    ingredients?: number[];
    quantity?: number;
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