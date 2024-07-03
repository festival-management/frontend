
export interface OrderProduct {
    id: number;
    variant?: number;
    ingredients?: number[];
    price: number;
}

export interface OrderMenuField {
    id: number;
    products: OrderProduct[];
}

export interface OrderMenu {
    id: number;
    fields: OrderMenuField[];
    price: number;
}

export interface Order {
    products: OrderProduct[];
    menus: OrderMenu[];
}