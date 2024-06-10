import BaseResponse from "./base.model";
import {Category} from "../enums/category";

export interface ProductDate {
    id: number;
    start_date: string;
    end_date: string;
}

export interface ProductIngredient {
    id: number;
    name: string;
    price: number;
}

export interface ProductRole {
    id: number;
    role_id: number;
}

export interface ProductVariant {
    id: number;
    name: string;
    price: number;
}

export interface Product {
    id: number;
    name: string;
    short_name: string;
    is_priority: boolean;
    price: number;
    category: Category;
    subcategory_id: number;
    dates?: ProductDate[];
    ingredients?: ProductIngredient[];
    roles?: ProductRole[];
    variants?: ProductVariant[];
}

export interface ProductName {
    id: number;
    name: string;
    short_name: string;
}

export interface AddProductDateResponse extends BaseResponse {
    date?: ProductDate;
}

export interface AddProductIngredientResponse extends BaseResponse {
    ingredient: ProductIngredient;
}

export interface CreateProductResponse extends BaseResponse {
    product?: Product;
}

export interface GetProductResponse extends BaseResponse, Partial<Product> {
}

export interface GetProductsResponse extends BaseResponse {
    total_count?: number;
    products?: Product[];
}

export interface GetProductsNameResponse extends BaseResponse {
    total_count?: number;
    products?: ProductName[];
}
