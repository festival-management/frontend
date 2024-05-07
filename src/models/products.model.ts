import BaseResponse from "./base.model";
import {Category} from "../enums/category";


export interface Product {
    id: number;
    name: string;
    short_name: string;
    is_priority: boolean;
    price: number;
    category: Category;
    subcategory_id: number;
}

export interface ProductName {
    id: number;
    name: string;
    short_name: string;
}

export interface CreateProductResponse extends BaseResponse {
    product?: Product;
}

export interface GetProductResponse extends BaseResponse, Product {
}

export interface GetProductsResponse extends BaseResponse {
    total_count?: number;
    products?: Product[];
}

export interface GetProductsNameResponse extends BaseResponse {
    total_count?: number;
    products?: ProductName[];
}
