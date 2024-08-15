import React from "react";
import {Link} from "react-router-dom";

import {Subcategory} from "../../models/subcategories.model";

interface SubcategoriesTableProps {
    data: Subcategory[];
    handlerDeleteSubcategory: (id: number) => void;
}

export default function SubcategoriesTable({data, handlerDeleteSubcategory}: SubcategoriesTableProps) {
    const subcategories: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>
                <Link className="btn btn-primary" to={`/subcategories/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlerDeleteSubcategory(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Subcategories</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {subcategories}
                </tbody>
            </table>
        </>
    );
}