import React from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import {ProductRole} from "../../../../models/products.model.ts";

type ProductEditRoleTableProps = {
    data: ProductRole[];
    rolesName: RoleName[];
    handleDelete: (productRoleId: number) => Promise<void>;
}

export default function ProductEditRolesTable({data, rolesName, handleDelete}: ProductEditRoleTableProps) {
    const rolesIdName: Map<number, string> = new Map();

    rolesName.map((roleName) => {
        rolesIdName.set(roleName.id, roleName.name);
    });

    const productRoles: React.JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{rolesIdName.get(v.role_id)}</td>
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
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {productRoles}
                </tbody>
            </table>
        </>
    );
}