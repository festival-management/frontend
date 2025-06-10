import React, {useEffect, useState} from "react";

import {UseSubcategoriesApiInterface} from "../../../models/subcategories.model.ts";
import useSubcategoryMutations from "../../../hooks/mutations/use-subcategory-mutations.ts";

interface SubcategoryEditIncludeCoverChargeFormProps {
    subcategoriesApi: UseSubcategoriesApiInterface;
    subcategoryId: number;
    subcategoryIncludeCoverCharge: boolean;
}

export default function SubcategoryEditIncludeCoverChargeForm({subcategoriesApi, subcategoryId, subcategoryIncludeCoverCharge}: SubcategoryEditIncludeCoverChargeFormProps) {
    const [newSubcategoryIncludeCoverCharge, setNewSubcategoryIncludeCoverCharge] = useState(subcategoryIncludeCoverCharge);

    const {updateSubcategoryIncludeCoverChargeMutation} = useSubcategoryMutations(subcategoriesApi);

    const handleNewIncludeCoverChargeChange = () => {
        setNewSubcategoryIncludeCoverCharge((prevState) => !prevState);
    };

    const handleSubmitChangeIncludeCoverCharge = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateSubcategoryIncludeCoverChargeMutation.mutate({id: subcategoryId, includeCoverCharge: newSubcategoryIncludeCoverCharge});
    };

    useEffect(() => {
        setNewSubcategoryIncludeCoverCharge(subcategoryIncludeCoverCharge);
    }, [subcategoryIncludeCoverCharge]);

    return (
        <>
            <h6>Change include cover charge</h6>
            <form onSubmit={handleSubmitChangeIncludeCoverCharge}>
                <div className="mb-3">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="formInputIncludeCoverCharge" checked={newSubcategoryIncludeCoverCharge}
                               onChange={handleNewIncludeCoverChargeChange}/>
                        <label className="form-check-label" htmlFor="formInputIncludeCoverCharge">
                            Include cover charge?
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    );
}