import React from "react";

import {Menu} from "../../models/menus.model.ts";

interface MenusTableProps {
    data: Menu[];
    handlerDeleteMenu: (id: number) => void;
}

export default function MenusTable({data, handlerDeleteMenu}: MenusTableProps) {
    const menus: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.short_name}</td>
            <td>{v.price}</td>
            <td>
                <a className="btn btn-primary" href={`/menus/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </a>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlerDeleteMenu(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Menus</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Short Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {menus}
                </tbody>
            </table>
        </>
    );
}