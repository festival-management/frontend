import React from "react";

import {Category} from "../../../enums/category";

type ProductEditCategoryFormProps = {
    category: string;
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditCategoryForm({
                                                    category,
                                                    handleCategoryChange,
                                                    handleSubmit
                                                }: ProductEditCategoryFormProps) {
    return (
        <>
            <h6>Change category</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select className="form-select mb-3" id="formInputCategory"
                            value={category}
                            onChange={handleCategoryChange}>
                        <option value="-1">Open this select menu</option>
                        {Object.values(Category).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}