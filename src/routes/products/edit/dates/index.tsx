import React, {useState} from "react";

import {ProductDate} from "../../../../models/products.model.ts";
import ProductEditDatesAdd from "./ProductEditDatesAdd.tsx";
import ProductEditDatesTable from "./ProductEditDatesTable.tsx";

type ProductEditDatesProps = {
    productDates: ProductDate[];
    handleDelete: (productDateId: number) => Promise<void>;
    handleSubmit: (startDate: string, endDate: string) => Promise<void>;
}

export default function ProductEditDates({productDates, handleDelete, handleSubmit}: ProductEditDatesProps) {
    const [newProductDateStartDate, setNewProductDateStartDate] = useState("");
    const [newProductDateEndDate, setNewProductDateEndDate] = useState("");

    const handleNewProductDateStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductDateStartDate(event.target.value);
    };

    const handleNewProductDateEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductDateEndDate(event.target.value);
    };

    const handleSubmitAddDate = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

        await handleSubmit(newProductDateStartDate, newProductDateEndDate);
    };

    return (
        <>
            <ProductEditDatesAdd newProductDateStartDate={newProductDateStartDate}
                                 newProductDateEndDate={newProductDateEndDate}
                                 handleProductDateStartDateChange={handleNewProductDateStartDateChange}
                                 handleProductDateEndDateChange={handleNewProductDateEndDateChange}
                                 handleSubmit={handleSubmitAddDate}/>
            <ProductEditDatesTable data={productDates} handleDelete={handleDelete}/>
        </>
    );
}