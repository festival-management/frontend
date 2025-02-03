import React, {useState} from "react";

import {UseSubcategoriesApiInterface} from "../../../models/subcategories.model.ts";
import useSubcategoryMutations from "../../../hooks/mutations/use-subcategory-mutations.ts";

type SubcategoryEditOrderFormProps = {
    subcategoriesApi: UseSubcategoriesApiInterface;
    subcategoryId: number;
    subcategoryOrder: number;
}

export default function SubcategoryEditOrderForm({
                                                     subcategoriesApi,
                                                     subcategoryId,
                                                     subcategoryOrder
                                                 }: SubcategoryEditOrderFormProps) {
    const [newSubcategoryOrder, setNewSubcategoryOrder] = useState(subcategoryOrder);

    const {updateSubcategoryOrderMutation} = useSubcategoryMutations(subcategoriesApi);

    const handleNewOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubcategoryOrder(parseInt(event.target.value));
    };

    const handleSubmitChangeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateSubcategoryOrderMutation.mutate({id: subcategoryId, order: newSubcategoryOrder});
    };

    return (
        <>
            <h6>Change order</h6>
            <form onSubmit={handleSubmitChangeOrder}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputOrder"
                        placeholder="Input the order of subcategory"
                        min="0"
                        value={newSubcategoryOrder}
                        onChange={handleNewOrderChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    );
}