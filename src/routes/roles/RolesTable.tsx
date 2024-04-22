import React from "react";

import {Role} from "../../models/roles.model";

interface RolesTableProps {
    data: Role[];
}

export default function RolesTable({data}: RolesTableProps) {
    const roles: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
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
    );
}
