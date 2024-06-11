import React from "react";

import {SubcategoryName} from "../../models/subcategories.model";

type SelectProductSubcategoryIdProps = {
    selectedSubcategoryId: number;
    subcategoriesName: SubcategoryName[];
    handleSelectedSubcategoryIdChange: (subcategoryId: number) => void;
}

export default function SelectProductSubcategoryId({
                                                       selectedSubcategoryId,
                                                       subcategoriesName,
                                                       handleSelectedSubcategoryIdChange
                                                   }: SelectProductSubcategoryIdProps) {
    return (
        <div className="btn-group d-flex flex-wrap mb-3" role="group" aria-label="Select Subcategory Id">
            {Object.values(subcategoriesName).map(subcategoryName => (
                <button key={subcategoryName.id} type="button"
                        className={`btn btn-outline-primary ${selectedSubcategoryId === subcategoryName.id ? 'active' : ''}`}
                        onClick={() => handleSelectedSubcategoryIdChange(subcategoryName.id)}>{subcategoryName.name}</button>
            ))}
        </div>
    );
}