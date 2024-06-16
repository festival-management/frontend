import React, {useState} from "react";

import MenuEditDatesAdd from "./MenuEditDatesAdd.tsx";
import {MenuDate} from "../../../../models/menus.model.ts";
import MenuEditDatesTable from "./MenuEditDatesTable.tsx";

type MenuEditDatesProps = {
    menuDates: MenuDate[];
    handleDelete: (menuDateId: number) => Promise<void>;
    handleSubmit: (startDate: string, endDate: string) => Promise<void>;
}

export default function MenuEditDates({menuDates, handleDelete, handleSubmit}: MenuEditDatesProps) {
    const [newMenuDateStartDate, setNewMenuDateStartDate] = useState("");
    const [newMenuDateEndDate, setNewMenuDateEndDate] = useState("");

    const handleNewMenuDateStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuDateStartDate(event.target.value);
    };

    const handleNewMenuDateEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuDateEndDate(event.target.value);
    };

    const handleSubmitAddDate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newMenuDateStartDate, newMenuDateEndDate);

        setNewMenuDateStartDate("");
        setNewMenuDateEndDate("");
    };

    return (
        <>
            <h6 className="mb-3">Dates</h6>
            <MenuEditDatesAdd newMenuDateStartDate={newMenuDateStartDate} newMenuDateEndDate={newMenuDateEndDate}
                              handleMenuDateStartDateChange={handleNewMenuDateStartDateChange}
                              handleMenuDateEndDateChange={handleNewMenuDateEndDateChange}
                              handleSubmit={handleSubmitAddDate}/>
            <MenuEditDatesTable data={menuDates} handleDelete={handleDelete}/>
            <hr/>
        </>
    );
}