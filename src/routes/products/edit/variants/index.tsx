import React, {useState} from "react";

import {ProductVariant} from "../../../../models/products.model.ts";
import ProductEditVariantAdd from "./ProductEditVariantAdd.tsx";
import ProductEditVariantTable from "./ProductEditVariantTable.tsx";

type ProductEditVariantsProps = {
    productVariants: ProductVariant[];
    handleDelete: (productVariantId: number) => Promise<void>;
    handleSubmit: (name: string, price: number) => Promise<void>;
}

export default function ProductEditVariants({productVariants, handleDelete, handleSubmit}: ProductEditVariantsProps) {
    const [newProductVariantName, setNewProductVariantName] = useState("");
    const [newProductVariantPrice, setNewProductVariantPrice] = useState(0);

    const handleProductVariantNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductVariantName(event.target.value);
    };

    const handleProductVariantPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductVariantPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddVariant = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newProductVariantName, newProductVariantPrice);

        setNewProductVariantName("");
        setNewProductVariantPrice(0);
    };

    return (
        <>
            <h6 className="mb-3">Variants</h6>
            <ProductEditVariantAdd newProductVariantName={newProductVariantName}
                                   newProductVariantPrice={newProductVariantPrice}
                                   handleProductVariantNameChange={handleProductVariantNameChange}
                                   handleProductVariantPriceChange={handleProductVariantPriceChange}
                                   handleSubmit={handleSubmitAddVariant}/>
            <ProductEditVariantTable data={productVariants} handleDelete={handleDelete}/>
        </>
    );
}