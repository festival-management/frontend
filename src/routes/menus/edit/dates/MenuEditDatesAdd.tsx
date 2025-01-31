import React, {useState} from "react";

import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

export default function MenuEditDatesAdd() {
    const [newMenuDateStartDate, setNewMenuDateStartDate] = useState("");
    const [newMenuDateEndDate, setNewMenuDateEndDate] = useState("");

    const {menusApi, menuId, setMenuDates} = useMenuEditContext();
    const {addMenuDateMutation} = useMenuMutations(menusApi);

    const handleNewMenuDateStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuDateStartDate(event.target.value);
    };

    const handleNewMenuDateEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuDateEndDate(event.target.value);
    };

    const handleSubmitAddDate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addMenuDateMutation.mutateAsync({
            id: menuId,
            startDate: newMenuDateStartDate,
            endDate: newMenuDateEndDate
        });

        if (!response.error) {
            setMenuDates((prevState) => [...prevState, response.date!]);
        }

        setNewMenuDateStartDate("");
        setNewMenuDateEndDate("");
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddDate}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <input type="datetime-local" id="newMenuDateStartDate" className="form-control"
                       value={newMenuDateStartDate}
                       onChange={handleNewMenuDateStartDateChange}
                       required/>
                <span className="input-group-text">End date</span>
                <input type="datetime-local" id="newMenuDateEndDate" className="form-control" value={newMenuDateEndDate}
                       onChange={handleNewMenuDateEndDateChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}