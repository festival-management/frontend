import React from "react";

import {useMenuEditContext} from "../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../hooks/mutations/use-menu-mutations.ts";


export default function MenuEditDailyMaxSales() {
    const {menusApi, menuId, menuDailyMaxSales, setMenuDailyMaxSales} = useMenuEditContext();
    const {updateMenuDailyMaxSalesMutation} = useMenuMutations(menusApi);

    const handleDailyMaxSalesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setMenuDailyMaxSales(value === '' ? null : parseInt(value));
    };

    const handleSubmitChangeDailyMaxSales = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuDailyMaxSalesMutation.mutate({id: menuId, dailyMaxSales: menuDailyMaxSales});
    };

    return (
        <>
            <h6>Change daily max sales</h6>
            <form onSubmit={handleSubmitChangeDailyMaxSales}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputDailyMaxSales"
                        placeholder="Input the daily max sales of menu"
                        min="0"
                        value={menuDailyMaxSales === null ? '' : menuDailyMaxSales}
                        onChange={handleDailyMaxSalesChange}
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