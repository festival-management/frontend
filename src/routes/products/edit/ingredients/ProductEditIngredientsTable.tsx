import React from "react";

import {ProductIngredient} from "../../../../models/products.model.ts";

type ProductEditIngredientsTableProps = {
    data: ProductIngredient[];
    handleDelete: (productIngredientId: number) => Promise<void>;
}

export default function ProductEditIngredientsTable({data, handleDelete}: ProductEditIngredientsTableProps) {
    const productIngredients: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.price}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(v.id)}
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
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {productIngredients}
                </tbody>
            </table>
        </>
    );
}