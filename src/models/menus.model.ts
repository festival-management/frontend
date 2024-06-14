import BaseResponse from "./base.model";

export interface MenuDate {
    id: number;
    start_date: string;
    end_date: string;
}

export interface MenuFieldProduct {
    id: number;
    price: number;
    product_id: number;
}

export interface MenuField {
    id: number;
    name: string;
    max_sortable_elements: number;
    is_optional: boolean;
    products: MenuFieldProduct[];
}

export interface MenuRole {
    id: number;
    role_id: number;
}

export interface Menu {
    id: number;
    name: string;
    short_name: string;
    price: number;
    dates?: MenuDate[];
    fields?: MenuField[];
    roles?: MenuRole[];
}

export interface CreateMenuResponse extends BaseResponse {
    menu?: Menu;
}

export interface GetMenuResponse extends BaseResponse, Partial<Menu> {
}

export interface GetMenusResponse extends BaseResponse {
    total_count?: number;
    menus?: Menu[];
}
