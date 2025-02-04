import React from "react";
import {Link} from "react-router-dom";

import useUsersApi from "../../api/users.ts";
import {User} from "../../models/users.model";
import useUserMutations from "../../hooks/mutations/use-user-mutations.ts";

interface UsersTableProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function UsersTable({users, setUsers, setTotalCount}: UsersTableProps) {
    const usersApi = useUsersApi();

    const {deleteUserMutation} = useUserMutations(usersApi);

    const handleDeleteUser = async (id: number) => {
        const response = await deleteUserMutation.mutateAsync(id);

        if (!response.error) {
            setUsers((prevState) => prevState.filter((user) => user.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = users.map(v => (
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
                    onClick={() => handleDeleteUser(v.id)}
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
                {tableBody}
                </tbody>
            </table>
        </>
    );
}