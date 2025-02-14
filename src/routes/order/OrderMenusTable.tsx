import {Menu} from "../../models/menus.model.ts";
import {Product} from "../../models/products.model.ts";
import OrderMenusTableElement from "./OrderMenusTableElement.tsx";

type OrderMenusTableProps = {
    menus: Menu[];
    products: Product[];
}

export default function OrderMenusTable({menus, products}: OrderMenusTableProps) {
    return (
        <div className="overflow-y-scroll remove-scrollbar">
            {menus.map((menu) => (
                <OrderMenusTableElement
                    key={menu.id}
                    menu={menu}
                    products={products}
                />
            ))}
        </div>
    );
}