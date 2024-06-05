import React from "react";

import {ProductDate} from "../../../../models/products.model.ts";

type ProductEditDatesTableProps = {
    data: ProductDate[];
    handleDelete: (productDateId: number) => Promise<void>;
}

export default function ProductEditDatesTable({data, handleDelete}: ProductEditDatesTableProps) {
    const productDates: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.start_date}</td>
            <td>{v.end_date}</td>
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
            <h6>Products</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {productDates}
                </tbody>
            </table>
        </>
    );
}