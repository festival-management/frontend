import React, {useEffect, useState} from "react";

import {Product} from "../../models/products.model.ts";
import {OrderProduct} from "../../models/order.model.ts";
import {SubcategoryName} from "../../models/subcategories.model.ts";
import OrderProductsTableElement from "./OrderProductsTableElement.tsx";
import SelectProductSubcategoryId from "../../components/select-product-subcategory-id.tsx";

type OrderProductsTableProps = {
    subcategoriesName: SubcategoryName[];
    products: Product[];
    handleSubmitAddProduct: (product: OrderProduct) => Promise<void>;
}

export default function OrderProductsTable({subcategoriesName, products, handleSubmitAddProduct}: OrderProductsTableProps) {
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [subcategoriesWithProducts, setSubcategoriesWithProducts] = useState<SubcategoryName[]>([]);

    const handleSelectedSubcategoryIdChange = (subcategoryId: number) => {
        setSelectedSubcategoryId(subcategoryId);
    };

    useEffect(() => {
        const subcategoriesSet = new Set(products.map(product => product.subcategory_id));
        const validSubcategories = subcategoriesName.filter(subcategory => subcategoriesSet.has(subcategory.id));
        setSubcategoriesWithProducts(validSubcategories);
    }, [subcategoriesName, products]);

    useEffect(() => {
        if (selectedSubcategoryId !== -1) {
            const newFilteredProducts = products.filter(product => product.subcategory_id === selectedSubcategoryId);
            setFilteredProducts(newFilteredProducts);
        } else {
            setFilteredProducts([]);
        }
    }, [selectedSubcategoryId, products]);

    return (
        <>
            <SelectProductSubcategoryId
                selectedSubcategoryId={selectedSubcategoryId}
                subcategoriesName={subcategoriesWithProducts}
                handleSelectedSubcategoryIdChange={handleSelectedSubcategoryIdChange}
            />
            <div className="overflow-y-scroll remove-scrollbar">
                {filteredProducts.map(product => (
                    <React.Fragment key={product.id}>
                        <OrderProductsTableElement product={product} handleSubmitAddProduct={handleSubmitAddProduct} />
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}