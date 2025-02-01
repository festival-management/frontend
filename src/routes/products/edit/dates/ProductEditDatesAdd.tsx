import React, {useState} from "react";

import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditDatesAdd() {
    const [newProductDateStartDate, setNewProductDateStartDate] = useState("");
    const [newProductDateEndDate, setNewProductDateEndDate] = useState("");

    const {productId, setProductDates, productsApi} = useProductEditContext();
    const {addProductDateMutation} = useProductMutations(productsApi);

    const handleNewProductDateStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductDateStartDate(event.target.value);
    };

    const handleNewProductDateEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductDateEndDate(event.target.value);
    };

    const handleSubmitAddDate = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

        const response = await addProductDateMutation.mutateAsync({id: productId, startDate: newProductDateStartDate, endDate: newProductDateEndDate});

        if (!response.error) {
            setProductDates((prevState) => [...prevState, response.date!]);
        }

        setNewProductDateStartDate("");
        setNewProductDateEndDate("");
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddDate}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <input type="datetime-local" id="newProductDateStartDate" className="form-control" value={newProductDateStartDate}
                       onChange={handleNewProductDateStartDateChange}
                       required/>
                <span className="input-group-text">End date</span>
                <input type="datetime-local" id="newProductDateEndDate" className="form-control" value={newProductDateEndDate}
                       onChange={handleNewProductDateEndDateChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}