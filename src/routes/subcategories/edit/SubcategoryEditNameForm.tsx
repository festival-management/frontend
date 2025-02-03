import React, {useEffect, useState} from "react";

import {UseSubcategoriesApiInterface} from "../../../models/subcategories.model.ts";
import useSubcategoryMutations from "../../../hooks/mutations/use-subcategory-mutations.ts";

type SubcategoryEditNameProps = {
    subcategoriesApi: UseSubcategoriesApiInterface;
    subcategoryId: number;
    subcategoryName: string;
}

export default function SubcategoryEditNameForm({
                                                    subcategoriesApi,
                                                    subcategoryId,
                                                    subcategoryName
                                                }: SubcategoryEditNameProps) {
    const [newSubcategoryName, setNewSubcategoryName] = useState(subcategoryName);

    const {updateSubcategoryNameMutation} = useSubcategoryMutations(subcategoriesApi);

    const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubcategoryName(event.target.value);
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateSubcategoryNameMutation.mutate({id: subcategoryId, name: newSubcategoryName});
    };

    useEffect(() => {
        setNewSubcategoryName(subcategoryName);
    }, [subcategoryName]);

    return (
        <>
            <h6>Change name</h6>
            <form onSubmit={handleSubmitChangeName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputName"
                        placeholder="Input the name of subcategory"
                        value={newSubcategoryName}
                        onChange={handleNewNameChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}