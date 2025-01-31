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
    additional_cost: number;
    is_optional: boolean;
    products?: MenuFieldProduct[];
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

export interface AddMenuDateResponse extends BaseResponse {
    date?: MenuDate;
}

export interface AddMenuFieldResponse extends BaseResponse {
    field?: MenuField;
}

export interface AddMenuFieldProductResponse extends BaseResponse {
    field_product?: MenuFieldProduct;
}

export interface AddMenuRoleResponse extends BaseResponse {
    role: MenuRole;
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

// Interface for the useMenusApi hook
export interface UseMenusApiInterface {
    addMenu(name: string, shortName: string, price: number): Promise<CreateMenuResponse>;
    addMenuDate(id: number, startDate: string, endDate: string): Promise<AddMenuDateResponse>;
    addMenuField(id: number, name: string, maxSortableElements: number, additionalCost: number): Promise<AddMenuFieldResponse>;
    addMenuFieldProduct(id: number, menuFieldId: number, price: number, productId: number): Promise<AddMenuFieldProductResponse>;
    addMenuRole(id: number, roleId: number): Promise<AddMenuRoleResponse>;
    deleteMenu(id: number): Promise<BaseResponse>;
    deleteMenuDate(id: number, menuDateId: number): Promise<BaseResponse>;
    deleteMenuField(id: number, menuFieldId: number): Promise<BaseResponse>;
    deleteMenuFieldProduct(id: number, menuFieldId: number, menuFieldProductId: number): Promise<BaseResponse>;
    deleteMenuRole(id: number, menuRoleId: number): Promise<BaseResponse>;
    getMenuById(id: number, includeDates?: boolean, includeFields?: boolean, includeRoles?: boolean): Promise<GetMenuResponse>;
    getMenus(page: number, orderBy?: string): Promise<GetMenusResponse>;
    getAllMenusUser(orderBy?: string, includeFields?: boolean): Promise<GetMenusResponse>;
    updateMenuFieldName(id: number, menuFieldId: number, name: string): Promise<BaseResponse>;
    updateMenuFieldIsOptional(id: number, menuFieldId: number, isOptional: boolean): Promise<BaseResponse>;
    updateMenuFieldMaxSortableElements(id: number, menuFieldId: number, maxSortableElements: number): Promise<BaseResponse>;
    updateMenuFieldAdditionalCost(id: number, menuFieldId: number, additionalCost: number): Promise<BaseResponse>;
    updateMenuName(id: number, name: string): Promise<BaseResponse>;
    updateMenuPrice(id: number, price: number): Promise<BaseResponse>;
    updateMenuShortName(id: number, shortName: string): Promise<BaseResponse>;
}
