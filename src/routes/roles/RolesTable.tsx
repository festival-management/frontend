import React from "react";
import {Link} from "react-router-dom";

import {Role, UseRolesApiInterface} from "../../models/roles.model";
import useRoleMutations from "../../hooks/mutations/use-role-mutations.ts";

interface RolesTableProps {
    rolesApi: UseRolesApiInterface;
    roles: Role[];
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function RolesTable({rolesApi, roles, setRoles, setTotalCount}: RolesTableProps) {
    const {deleteRoleMutation} = useRoleMutations(rolesApi);

    const handleDeleteRole = async (id: number) => {
        const response = await deleteRoleMutation.mutateAsync(id);

        if (!response.error) {
            setRoles((prevState) => prevState.filter((role) => role.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = roles.map(v => (
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
                    onClick={() => handleDeleteRole(v.id)}
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
                {tableBody}
                </tbody>
            </table>
        </>
    );
}
