import React from "react";

import {useMenuEditContext} from "../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../hooks/mutations/use-menu-mutations.ts";

export default function MenuEditPriceForm() {
    const {menusApi, menuId, menuPrice, setMenuPrice} = useMenuEditContext();
    const {updateMenuPriceMutation} = useMenuMutations(menusApi);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuPrice(parseFloat(event.target.value));
    };

    const handleSubmitChangePrice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuPriceMutation.mutate({id: menuId, price: menuPrice});
    };

    return (
        <>
            <h6>Change price</h6>
            <form onSubmit={handleSubmitChangePrice}>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="formInputPrice"
                        placeholder="Input the price of menu"
                        min="0"
                        step="0.01"
                        value={menuPrice}
                        onChange={handlePriceChange}
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