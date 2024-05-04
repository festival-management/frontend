import BaseResponse from "./base.model";

export interface Subcategory {
    id: number;
    name: string;
    order: number;
}

export interface SubcategoryName {
    id: number;
    name: string;
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
