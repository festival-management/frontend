import React from "react";

import {OrderMenu, OrderMenuField} from "../../../models/order.model.ts";

type OrderInfoMenusTableProps = {
    orderMenus: OrderMenu[] | undefined;
}

function getFieldName(orderMenu: OrderMenu, field: OrderMenuField): string | undefined {
    const menuField = orderMenu.menu?.fields?.find(f => f.id === field.menu_field_id);
    return menuField?.name;
}

function getFieldProducts(orderMenu: OrderMenu, field: OrderMenuField): React.JSX.Element[] | string {
    const menuField = orderMenu.menu?.fields?.find(f => f.id === field.menu_field_id);

    if (!field.products || !menuField) return "";

    return field.products.map((product, index) => {
        const productData = menuField.products?.find(p => p.product.id === product.product_id)?.product;
        const variant = productData?.variants?.find(v => v.id === product.variant_id);
        const ingredientNames = product.ingredients
            ?.map((ingredient) => {
                return productData?.ingredients?.find(i => i.id === ingredient.product_ingredient_id)?.name;
            })
            .filter(Boolean)
            .join(", ");

        return (
            <div key={`product-${field.id}-${index}`}>
                {`x${product.quantity} ${productData?.name ?? "Product"} ${variant?.name ?? ""}`}
                {ingredientNames ? ` (${ingredientNames})` : ""}
            </div>
        );
    });
}

export default function OrderInfoMenusTable({orderMenus}: OrderInfoMenusTableProps) {
    const tableBodyMenus = orderMenus?.map((orderMenu) => {
        const fields = orderMenu.fields ?? [];

        const firstRow = (
            <tr key={`menus-${orderMenu.id}-row-main`}>
                <th scope="row" rowSpan={Math.max(1, fields.length)}>{orderMenu.id}</th>
                <td rowSpan={Math.max(1, fields.length)}>{orderMenu.menu?.name}</td>
                <td rowSpan={Math.max(1, fields.length)}>{orderMenu.price}</td>
                <td rowSpan={Math.max(1, fields.length)}>{orderMenu.quantity}</td>

                {fields.length > 0 ? (
                    <>
                        <td>{getFieldName(orderMenu, fields[0])}</td>
                        <td>{getFieldProducts(orderMenu, fields[0])}</td>
                    </>
                ) : (
                    <>
                        <td></td>
                        <td></td>
                    </>
                )}
            </tr>
        );

        const extraRows = fields.slice(1).map((field) => (
            <tr key={`menus-${orderMenu.id}-field-${field.id}`}>
                <td>{getFieldName(orderMenu, field)}</td>
                <td>{getFieldProducts(orderMenu, field)}</td>
            </tr>
        ));

        return [firstRow, ...extraRows];
    });

    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Field</th>
                <th scope="col">Products</th>
            </tr>
            </thead>
            <tbody>
            {tableBodyMenus}
            </tbody>
        </table>
    );
}