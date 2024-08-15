import React from "react";
import {Link} from "react-router-dom";

import {User} from "../../models/users.model";

interface UsersTableProps {
    data: User[];
    handlerDeleteUser: (id: number) => void;
}

export default function UsersTable({data, handlerDeleteUser}: UsersTableProps) {
    const users: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.username}</td>
            <td>
                <Link className="btn btn-primary" to={`/users/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlerDeleteUser(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Users</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </table>
        </>
    );
}