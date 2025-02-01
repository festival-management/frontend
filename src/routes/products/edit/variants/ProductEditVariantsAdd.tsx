import React, {useState} from "react";

import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditVariantsAdd() {
    const [newProductVariantName, setNewProductVariantName] = useState("");
    const [newProductVariantPrice, setNewProductVariantPrice] = useState(0);

    const {productId, setProductVariants, productsApi} = useProductEditContext();
    const {addProductVariantMutation} = useProductMutations(productsApi);

    const handleProductVariantNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductVariantName(event.target.value);
    };

    const handleProductVariantPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductVariantPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddVariant = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addProductVariantMutation.mutateAsync({id: productId, name: newProductVariantName, price: newProductVariantPrice});

        if (!response.error) {
            setProductVariants((prevState) => [...prevState, response.variant!]);
        }

        setNewProductVariantName("");
        setNewProductVariantPrice(0);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddVariant}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="newProductVariantName"
                    placeholder="Input the name of product variant"
                    value={newProductVariantName}
                    onChange={handleProductVariantNameChange}
                    required
                />
                <span className="input-group-text">Price</span>
                <input
                    type="number"
                    className="form-control"
                    id="newProductVariantPrice"
                    placeholder="Input the price of product variant"
                    min="0"
                    value={newProductVariantPrice}
                    onChange={handleProductVariantPriceChange}
                    step='0.01'
                    required
                />
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}