import BaseResponse from "./base.model";

export interface Subcategory {
    id: number;
    name: string;
    order: number;
    include_cover_charge: boolean;
}

export interface SubcategoryName {
    id: number;
    name: string;
    include_cover_charge: boolean;
}

export interface CreateSubcategoryResponse extends BaseResponse {
    subcategory?: Subcategory;
}

export interface GetSubcategoriesResponse extends BaseResponse {
    total_count?: number;
    subcategories?: Subcategory[];
}

export interface GetSubcategoriesNameResponse extends BaseResponse {
    total_count?: number;
    subcategories?: SubcategoryName[];
}

export interface GetSubcategoryResponse extends BaseResponse, Partial<Subcategory> {
}

// Interface for the useSubcategoriesApi hook
export interface UseSubcategoriesApiInterface {
    addSubcategory(name: string): Promise<CreateSubcategoryResponse>;
    deleteSubcategory(id: number): Promise<BaseResponse>;
    getSubcategories(page: number, orderBy?: string): Promise<GetSubcategoriesResponse>;
    getSubcategoriesName(orderBy?: string): Promise<GetSubcategoriesNameResponse>;
    getSubcategoryById(id: number): Promise<GetSubcategoryResponse>;
    updateSubcategoryIncludeCoverCharge(id: number, includeCoverCharge: boolean): Promise<BaseResponse>;
    updateSubcategoryName(id: number, name: string): Promise<BaseResponse>;
    updateSubcategoryOrder(id: number, order: number): Promise<BaseResponse>;
}
