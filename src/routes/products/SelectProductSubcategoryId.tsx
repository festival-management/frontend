import React from "react";

import {SubcategoryName} from "../../models/subcategories.model";

type SelectProductSubcategoryIdProps = {
    selectedSubcategoryId: number;
    subcategoriesName: SubcategoryName[];
    handleSelectedSubcategoryIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectProductSubcategoryId({
                                                       selectedSubcategoryId,
                                                       subcategoriesName,
                                                       handleSelectedSubcategoryIdChange
                                                   }: SelectProductSubcategoryIdProps) {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text">Subcategory</span>
            <select className="form-select" id="selectSubcategoryId"
                    value={selectedSubcategoryId}
                    onChange={handleSelectedSubcategoryIdChange}>
                <option value="-1">Select Subcategory</option>
                {Object.values(subcategoriesName).map(subcategoryName => (
                    <option key={subcategoryName.id} value={subcategoryName.id}>{subcategoryName.name}</option>
                ))}
            </select>
        </div>
    );
}