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

export interface AddProductRoleResponse extends BaseResponse {
    role: ProductRole;
}

export interface AddProductVariantResponse extends BaseResponse {
    variant: ProductVariant;
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

// Interface for the useProductsApi hook
export interface UseProductsApiInterface {
    addProduct(name: string, shortName: string, price: number, category: string, subcategoryId: number): Promise<CreateProductResponse>;
    addProductDate(id: number, startDate: string, endDate: string): Promise<AddProductDateResponse>;
    addProductIngredient(id: number, name: string, price: number): Promise<AddProductIngredientResponse>;
    addProductRole(id: number, roleId: number): Promise<AddProductRoleResponse>;
    addProductVariant(id: number, name: string, price: number): Promise<AddProductVariantResponse>;
    deleteProduct(id: number): Promise<BaseResponse>;
    deleteProductDate(id: number, productDateId: number): Promise<BaseResponse>;
    deleteProductIngredient(id: number, productIngredientId: number): Promise<BaseResponse>;
    deleteProductRole(id: number, productRoleId: number): Promise<BaseResponse>;
    deleteProductVariant(id: number, productVariantId: number): Promise<BaseResponse>;
    getProductById(id: number, includeDates?: boolean, includeIngredients?: boolean, includeRoles?: boolean, includeVariants?: boolean): Promise<GetProductResponse>;
    getProducts(page: number, subcategoryId?: number, orderBy?: string): Promise<GetProductsResponse>;
    getAllProductsUser(orderBy?: string, includeIngredients?: boolean, includeVariants?: boolean): Promise<GetProductsResponse>;
    getProductsName(orderBy: string): Promise<GetProductsNameResponse>;
    updateProductCategory(id: number, category: string): Promise<BaseResponse>;
    updateProductIsPriority(id: number, isPriority: boolean): Promise<BaseResponse>;
    updateProductName(id: number, name: string): Promise<BaseResponse>;
    updateProductPrice(id: number, price: number): Promise<BaseResponse>;
    updateProductShortName(id: number, shortName: string): Promise<BaseResponse>;
    updateProductSubcategory(id: number, subcategoryId: number): Promise<BaseResponse>;
}
