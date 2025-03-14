import React from "react";

import {OrderMenu} from "../../../models/order.model.ts";

type OrderInfoMenusTableProps = {
    orderMenus: OrderMenu[] | undefined;
}

export default function OrderInfoMenusTable({orderMenus}: OrderInfoMenusTableProps) {
    const tableBodyMenus = orderMenus?.map((orderMenu) => (
        <React.Fragment key={`menus-${orderMenu.id}`}>
            <tr>
                <th scope="row" rowSpan={orderMenu.fields?.length || 1}>{orderMenu.id}</th>
                <td rowSpan={orderMenu.fields?.length || 1}>{orderMenu.menu?.name}</td>
                <td rowSpan={orderMenu.fields?.length || 1}>{orderMenu.price}</td>
                <td rowSpan={orderMenu.fields?.length || 1}>{orderMenu.quantity}</td>
                <td colSpan={2}></td>
            </tr>
            {orderMenu.fields?.map((field) => {
                const menuFieldDetails = orderMenu.menu?.fields?.find((menuField) => menuField.id === field.menu_field_id);

                return (
                    <tr key={`${orderMenu.id}-field-${field.id}`}>
                        <td colSpan={4}></td>
                        <td>{menuFieldDetails?.name}</td>
                        <td>
                            {field.products?.map((product, index) => {
                                const productDetails = menuFieldDetails?.products?.find((prod) => prod.product.id === product.product_id)?.product;
                                const variantName = productDetails?.variants?.find((variant) => variant.id === product.variant_id)?.name;

                                const ingredientDetails = product.ingredients?.map((ingredient) => {
                                    const ingredientName = productDetails?.ingredients?.find((ing) => ing.id === ingredient.product_ingredient_id)?.name;
                                    return `x${ingredient.quantity} ${ingredientName}`;
                                }).join(", ");

                                return (
                                    <div key={`${orderMenu.id}-field-${field.id}-product-${index}`}>
                                        {`x${product.quantity} ${productDetails?.name} ${variantName}` + (ingredientDetails && ` (${ingredientDetails})`)}
                                    </div>
                                );
                            })}
                        </td>
                    </tr>
                );
            })}
        </React.Fragment>
    ));

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