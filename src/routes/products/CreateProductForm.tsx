import React from "react";
import {Category} from "../../enums/category";

type CreateProductFormProps = {
    name: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shortName: string;
    handleShortNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    price: number;
    handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    category: string;
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: () => void;
}

export default function CreateProductForm({
                                              name,
                                              handleNameChange,
                                              shortName,
                                              handleShortNameChange,
                                              price,
                                              handlePriceChange,
                                              category,
                                              handleCategoryChange,
                                              handleSubmit
                                          }: CreateProductFormProps) {
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
                                    <input type="text" id="newProductName" className="form-control" value={name}
                                           onChange={handleNameChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newProductShortName" className="col-form-label">Short name:</label>
                                    <input type="text" id="newProductShortName" className="form-control"
                                           value={shortName}
                                           onChange={handleShortNameChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newProductName" className="col-form-label">Price:</label>
                                    <input type="number" id="newProductPrice" className="form-control" value={price}
                                           onChange={handlePriceChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newProductCategory" className="col-form-label">Category:</label>
                                    <select className="form-select mb-3" id="newProductCategory"
                                            value={category}
                                            onChange={handleCategoryChange}>
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
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}