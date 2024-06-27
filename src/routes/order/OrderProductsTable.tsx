import React, {useEffect, useState} from "react";

import {Product} from "../../models/products.model.ts";
import {SubcategoryName} from "../../models/subcategories.model.ts";
import SelectProductSubcategoryId from "../../components/select-product-subcategory-id.tsx";
import OrderProductsTableElement from "./OrderProductsTableElement.tsx";

type OrderProductsTableProps = {
    subcategoriesName: SubcategoryName[];
    products: Product[];
}

export default function OrderProductsTable({subcategoriesName, products}: OrderProductsTableProps) {
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);
    const [subcategoryIdProducts, setSubcategoryIdProducts] = useState<Map<number, Product[]>>(new Map());
    const [subcategoriesNameUsed, setSubcategoriesNameUsed] = useState<SubcategoryName[]>([]);
    const [productsElements, setProductsElements] = useState<React.JSX.Element[]>([]);

    const handleSelectedSubcategoryIdChange = (subcategoryId: number) => {
        setSelectedSubcategoryId(subcategoryId);
    };

    useEffect(() => {
        const newSubcategoryIdProducts = new Map<number, Product[]>();

        for (const product of products) {
            if (!newSubcategoryIdProducts.get(product.subcategory_id)) {
                newSubcategoryIdProducts.set(product.subcategory_id, []);
            }
            newSubcategoryIdProducts.get(product.subcategory_id).push(product);
        }

        const newSubcategoriesNameUsed = subcategoriesName.filter(subcategoryName =>
            newSubcategoryIdProducts.has(subcategoryName.id)
        );

        setSubcategoryIdProducts(newSubcategoryIdProducts);
        setSubcategoriesNameUsed(newSubcategoriesNameUsed);
    }, [subcategoriesName, products]);

    useEffect(() => {
        if (selectedSubcategoryId !== -1 && subcategoryIdProducts.has(selectedSubcategoryId)) {
            const newProductsElements = subcategoryIdProducts.get(selectedSubcategoryId).map((product) => (
                <React.Fragment key={product.id}>
                    <OrderProductsTableElement product={product} />
                </React.Fragment>
            ));
            setProductsElements(newProductsElements);
        } else {
            setProductsElements([]);
        }
    }, [selectedSubcategoryId, subcategoryIdProducts]);

    return (
        <>
            <SelectProductSubcategoryId selectedSubcategoryId={selectedSubcategoryId}
                                        subcategoriesName={subcategoriesNameUsed}
                                        handleSelectedSubcategoryIdChange={handleSelectedSubcategoryIdChange}/>
            {productsElements}
        </>
    );
}