
export interface OrderProduct {
    id: number;
    variant?: number;
    ingredients?: number[];
}

export interface OrderMenuField {
    id: number;
    products: OrderProduct[];
}

export interface OrderMenu {
    id: number;
    fields: OrderMenuField[];
}

export interface Order {
    products: OrderProduct[];
    menus: OrderMenu[];
}