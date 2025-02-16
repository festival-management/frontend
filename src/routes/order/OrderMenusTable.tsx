import {Menu} from "../../models/menus.model.ts";
import OrderMenusTableElement from "./OrderMenusTableElement.tsx";

type OrderMenusTableProps = {
    menus: Menu[];
}

export default function OrderMenusTable({menus}: OrderMenusTableProps) {
    return (
        <div className="overflow-y-scroll remove-scrollbar">
            {menus.map((menu) => (
                <OrderMenusTableElement
                    key={menu.id}
                    menu={menu}
                />
            ))}
        </div>
    );
}