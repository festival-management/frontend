import React, {useState} from "react";

import {Category} from "../../enums/category";
import {Product, UseProductsApiInterface} from "../../models/products.model.ts";
import {useProductMutations} from "../../hooks/mutations/use-product-mutations.ts";

type CreateProductFormProps = {
    productsApi: UseProductsApiInterface;
    subcategoryId: number;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateProductForm({
                                              productsApi,
                                              subcategoryId,
                                              setProducts,
                                              setTotalCount
                                          }: CreateProductFormProps) {
    const [newProductName, setNewProductName] = useState("");
    const [newProductShortName, setNewProductShortName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState(0);
    const [newProductCategory, setNewProductCategory] = useState("-1");

    const {addProductMutation} = useProductMutations(productsApi);

    const handleNewProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductName(event.target.value);
    };

    const handleNewProductShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductShortName(event.target.value);
    };

    const handleNewProductPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductPrice(parseFloat(event.target.value));
    };

    const handleNewProductCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProductCategory(event.target.value);
    };

    const handleAddProduct = async () => {
        const response = await addProductMutation.mutateAsync({
            name: newProductName,
            shortName: newProductShortName,
            price: newProductPrice,
            category: newProductCategory,
            subcategoryId: subcategoryId
        });

        if (!response.error) {
            setProducts((prevState) => [...prevState, response.product!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewProductName("");
        setNewProductShortName("");
        setNewProductPrice(0);
        setNewProductCategory("-1");
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#createProductModal">Add product
            </button>

            <div className="modal fade" id="createProductModal" tabIndex={-1} aria-labelledby="createProducModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createProducModalLabel">Add product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="newProductName" className="col-form-label">Name:</label>
                                    <input type="text" id="newProductName" className="form-control"
                                           value={newProductName}
                                           onChange={handleNewProductNameChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newProductShortName" className="col-form-label">Short name:</label>
                                    <input type="text" id="newProductShortName" className="form-control"
                                           value={newProductShortName}
                                           onChange={handleNewProductShortNameChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newProductName" className="col-form-label">Price:</label>
                                    <input type="number" id="newProductPrice" className="form-control"
                                           value={newProductPrice}
                                           step='0.01'
                                           onChange={handleNewProductPriceChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newProductCategory" className="col-form-label">Category:</label>
                                    <select className="form-select mb-3" id="newProductCategory"
                                            value={newProductCategory}
                                            onChange={handleNewProductCategoryChange}>
                                        <option value="-1">Open this select menu</option>
                                        {Object.values(Category).map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}