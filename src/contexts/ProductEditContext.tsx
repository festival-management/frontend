import React, {createContext, ReactNode, useContext, useState} from 'react';

import {
    ProductDate,
    ProductIngredient,
    ProductRole,
    ProductVariant,
    UseProductsApiInterface
} from "../models/products.model.ts";
import useProductsApi from "../api/products.ts";

interface ProductEditContextType {
    productId: number;
    setProductId: React.Dispatch<React.SetStateAction<number>>;
    productName: string;
    setProductName: React.Dispatch<React.SetStateAction<string>>;
    productShortName: string;
    setProductShortName: React.Dispatch<React.SetStateAction<string>>;
    productPriority: boolean;
    setProductPriority: React.Dispatch<React.SetStateAction<boolean>>;
    productPrice: number;
    setProductPrice: React.Dispatch<React.SetStateAction<number>>;
    productCategory: string;
    setProductCategory: React.Dispatch<React.SetStateAction<string>>;
    productOrder: number;
    setProductOrder: React.Dispatch<React.SetStateAction<number>>;
    productDailyMaxSales: number | null;
    setProductDailyMaxSales: React.Dispatch<React.SetStateAction<number | null>>;
    productSubcategoryId: number;
    setProductSubcategoryId: React.Dispatch<React.SetStateAction<number>>;
    productDates: ProductDate[];
    setProductDates: React.Dispatch<React.SetStateAction<ProductDate[]>>;
    productIngredients: ProductIngredient[];
    setProductIngredients: React.Dispatch<React.SetStateAction<ProductIngredient[]>>;
    productRoles: ProductRole[];
    setProductRoles: React.Dispatch<React.SetStateAction<ProductRole[]>>;
    productVariants: ProductVariant[];
    setProductVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
    productsApi: UseProductsApiInterface;
}

const ProductEditContext = createContext<ProductEditContextType | undefined>(undefined);

interface ProductEditProviderProps {
    children: ReactNode;
}

export const ProductEditProvider = ({children}: ProductEditProviderProps) => {
    const [productId, setProductId] = useState(-1);
    const [productName, setProductName] = useState("");
    const [productShortName, setProductShortName] = useState("");
    const [productPriority, setProductPriority] = useState(false);
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [productOrder, setProductOrder] = useState(0);
    const [productDailyMaxSales, setProductDailyMaxSales] = useState<number | null>(null);
    const [productSubcategoryId, setProductSubcategoryId] = useState(-1);
    const [productDates, setProductDates] = useState<ProductDate[]>([]);
    const [productIngredients, setProductIngredients] = useState<ProductIngredient[]>([]);
    const [productRoles, setProductRoles] = useState<ProductRole[]>([]);
    const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

    const productsApi = useProductsApi();

    return (
        <ProductEditContext.Provider
            value={{
                productId, setProductId,
                productName, setProductName,
                productShortName, setProductShortName,
                productPriority, setProductPriority,
                productPrice, setProductPrice,
                productCategory, setProductCategory,
                productOrder, setProductOrder,
                productDailyMaxSales, setProductDailyMaxSales,
                productSubcategoryId, setProductSubcategoryId,
                productDates, setProductDates,
                productIngredients, setProductIngredients,
                productRoles, setProductRoles,
                productVariants, setProductVariants,
                productsApi
            }}
        >
            {children}
        </ProductEditContext.Provider>
    );
};

export const useProductEditContext = (): ProductEditContextType => {
    const context = useContext(ProductEditContext);

    if (!context) {
        throw new Error('useProductEditContext must be used within a ProductEditContext');
    }

    return context;
};
