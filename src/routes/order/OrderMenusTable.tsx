import React, {useEffect, useState} from "react";

import {Menu} from "../../models/menus.model.ts";
import {OrderMenu} from "../../models/order.model.ts";
import {Product} from "../../models/products.model.ts";
import {ToastType} from "../../models/toast-message.model.ts";
import OrderMenusTableElement from "./OrderMenusTableElement.tsx";

type OrderMenusTableProps = {
    menus: Menu[];
    products: Product[];
    addToast: (errorCode: number, type: ToastType) => void;
    handleSubmitAddMenu: (menu: OrderMenu) => Promise<void>;
}

export default function OrderMenusTable({menus, products, addToast, handleSubmitAddMenu}: OrderMenusTableProps) {
    const [menusElements, setMenusElements] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const newMenusElements = menus.map((menu) => (
            <React.Fragment key={menu.id}>
                <OrderMenusTableElement menu={menu} products={products} addToast={addToast} handleSubmitAddMenu={handleSubmitAddMenu}/>
            </React.Fragment>
        ));
        setMenusElements(newMenusElements);
    }, [addToast, handleSubmitAddMenu, menus, products]);

    return (
        <div className="overflow-y-scroll remove-scrollbar">
            {menusElements}
        </div>
    );
}