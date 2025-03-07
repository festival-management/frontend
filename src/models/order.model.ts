import {Menu} from "./menus.model.ts";
import {User} from "./users.model.ts";
import BaseResponse from "./base.model.ts";
import {Product} from "./products.model.ts";

export interface OrderProductIngredient {
    id: number;
    product_ingredient_id: number;
    quantity: number;
}

export interface OrderProduct {
    id: number;
    product_id: number;
    price: number;
    quantity: number;
    variant_id?: number;
    order_menu_field_id?: number;
    product?: Product;
    ingredients?: OrderProductIngredient[];
}

export interface OrderMenuField {
    id: number;
    menu_field_id: number;
    products?: OrderProduct[];
}

export interface OrderMenu {
    id: number;
    price: number;
    quantity: number;
    menu?: Menu;
    fields?: OrderMenuField[];
}

export interface Order {
    id: number;
    customer: string;
    guests?: number;
    is_take_away: boolean;
    table?: number;
    user?: User;
    menus?: OrderMenu[];
    products?: OrderProduct[];
    created_at: string;
}

export interface CreateOrderProductIngredient {
    ingredient_id: number;
    quantity: number;
}

export interface CreateOrderProduct {
    product_id: number;
    variant_id?: number;
    ingredients: CreateOrderProductIngredient[];
    quantity: number;
    price: number;
}

export interface CreateOrderMenuField {
    menu_field_id: number;
    products: CreateOrderProduct[];
}

export interface CreateOrderMenu {
    menu_id: number;
    fields: CreateOrderMenuField[];
    quantity: number;
    price: number;
}

export interface GetOrdersResponse extends BaseResponse {
    total_count: number;
    orders: Order[];
}

// Interface for the useOrdersApi hook
export interface UseOrdersApiInterface {
    addOrder(customer: string, guests: number | null, isTakeAway: boolean, table: number | null, products: CreateOrderProduct[], menus: CreateOrderMenu[]): Promise<BaseResponse>;
    getOrders(page: number, includeMenus: boolean, includeMenusMenu: boolean, includeMenusMenuDates: boolean, includeMenusMenuFields: boolean, includeMenusMenuFieldsProducts: boolean, includeMenusMenuFieldsProductsDates: boolean, includeMenusMenuFieldsProductsIngredients: boolean, includeMenusMenuFieldsProductsRoles: boolean, includeMenusMenuFieldsProductsVariants: boolean, includeMenusMenuRoles: boolean, includeMenusFields: boolean, includeMenusFieldsProducts: boolean, includeMenusFieldsProductsIngredients: boolean, includeProducts: boolean, includeProductsProduct: boolean, includeProductsProductDates: boolean, includeProductsProductIngredients: boolean, includeProductsProductRoles: boolean, includeProductsProductVariants: boolean, includeProductsIngredients: boolean, includeUser: boolean, orderBy?: string): Promise<GetOrdersResponse>;
    deleteOrder(id: number): Promise<BaseResponse>;
}
