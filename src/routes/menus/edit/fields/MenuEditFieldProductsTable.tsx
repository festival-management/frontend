import React from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {ProductName} from "../../../../models/products.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldProductsTableProps = {
    menuField: MenuField;
    productsName: ProductName[];
}

export default function MenuEditFieldProductsTable({menuField, productsName}: MenuEditFieldProductsTableProps) {
    const {menusApi, menuId, setMenuFields} = useMenuEditContext();
    const {deleteMenuFieldProductMutation} = useMenuMutations(menusApi);

    const productsIdName: Map<number, string> = new Map();

    productsName.map((productName) => {
        productsIdName.set(productName.id, productName.name);
    });

    const handleDeleteMenuFieldProduct = async (menuFieldProductId: number) => {
        const response = await deleteMenuFieldProductMutation.mutateAsync({
            id: menuId,
            menuFieldId: menuField.id,
            menuFieldProductId
        });

        if (!response.error) {
            setMenuFields((prevState) => prevState.map((menuField) => menuField.id === menuField.id ? {
                ...menuField,
                products: (menuField.products || []).filter((menuFieldProduct) => menuFieldProduct.id !== menuFieldProductId)
            } : menuField));
        }
    };

    const menuFields: React.JSX.Element[] = (menuField.products || []).map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{productsIdName.get(v.product_id)}</td>
            <td>{v.price}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteMenuFieldProduct(v.id)}
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