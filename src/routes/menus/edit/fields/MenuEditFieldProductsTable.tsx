import React from "react";

import {ProductName} from "../../../../models/products.model.ts";
import {MenuFieldProduct} from "../../../../models/menus.model.ts";

type MenuEditFieldProductsTableProps = {
    menuFieldId: number;
    productsName: ProductName[];
    data: MenuFieldProduct[];
    handleDeleteMenuFieldProduct: (menuFieldId: number, menuFieldProductId: number) => void;
}

export default function MenuEditFieldProductsTable({
                                                       menuFieldId,
                                                       productsName,
                                                       data,
                                                       handleDeleteMenuFieldProduct
                                                   }: MenuEditFieldProductsTableProps) {
    const productsIdName: Map<number, string> = new Map();

    productsName.map((productName) => {
        productsIdName.set(productName.id, productName.name);
    });

    const menuFields: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{productsIdName.get(v.product_id)}</td>
            <td>{v.price}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteMenuFieldProduct(menuFieldId, v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {menuFields}
                </tbody>
            </table>
        </>
    );
}