import {Product} from "../../models/products.model";
import React from "react";

interface ProductsTableProps {
    data: Product[];
    handlerDeleteProduct: (id: number) => void;
}

export default function ProductsTable({data, handlerDeleteProduct}: ProductsTableProps) {
    const products: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.short_name}</td>
            <td>{v.is_priority ? "Yes" : "No"}</td>
            <td>{v.price}</td>
            <td>{v.category}</td>
            <td>
                <a className="btn btn-primary" href={`/products/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </a>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlerDeleteProduct(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Products</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Short Name</th>
                    <th scope="col">Is Priority</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products}
                </tbody>
            </table>
        </>
    );
}