import React from "react";

import {SubcategoryName} from "../../../models/subcategories.model";

type ProductEditSubcategoryIdFormProps = {
    subcategoryId: number;
    subcategoriesName: SubcategoryName[]
    handleSubcategoryIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditSubcategoryIdForm({
                                                         subcategoryId,
                                                         subcategoriesName,
                                                         handleSubcategoryIdChange,
                                                         handleSubmit
                                                     }: ProductEditSubcategoryIdFormProps) {
    return (
        <>
            <h6>Change subcategory</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select className="form-select" id="formInputSubcategory"
                            value={subcategoryId}
                            onChange={handleSubcategoryIdChange}>
                        <option value="-1">Select Subcategory</option>
                        {Object.values(subcategoriesName).map(subcategoryName => (
                            <option key={subcategoryName.id} value={subcategoryName.id}>{subcategoryName.name}</option>
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