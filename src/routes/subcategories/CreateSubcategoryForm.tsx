import React, {useState} from "react";

import useSubcategoryMutations from "../../hooks/mutations/use-subcategory-mutations.ts";
import {Subcategory, UseSubcategoriesApiInterface} from "../../models/subcategories.model.ts";

type CreateSubcategoryFormProps = {
    subcategoriesApi: UseSubcategoriesApiInterface;
    setSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateSubcategoryForm({
                                                  subcategoriesApi,
                                                  setSubcategories,
                                                  setTotalCount
                                              }: CreateSubcategoryFormProps) {
    const [newSubcategoryName, setNewSubcategoryName] = useState("");

    const {addSubcategoryMutation} = useSubcategoryMutations(subcategoriesApi);

    const handleNewSubcategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubcategoryName(event.target.value);
    };

    const handleSubmitAddSubcategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addSubcategoryMutation.mutateAsync(newSubcategoryName);

        if (!response.error) {
            setSubcategories((prevState) => [...prevState, response.subcategory!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewSubcategoryName("");
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddSubcategory}>
            <h6>Create new subcategory</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newSubcategoryName" className="form-control" value={newSubcategoryName}
                       onChange={handleNewSubcategoryNameChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}