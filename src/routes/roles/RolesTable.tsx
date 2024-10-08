import React from "react";
import {Link} from "react-router-dom";

import {Role} from "../../models/roles.model";

interface RolesTableProps {
    data: Role[];
    handlerDeleteRole: (id: number) => void;
}

export default function RolesTable({data, handlerDeleteRole}: RolesTableProps) {
    const roles: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>
                <Link className="btn btn-primary" to={`/roles/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlerDeleteRole(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Roles</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {roles}
                </tbody>
            </table>
        </>
    );
}
