import React from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import {MenuRole} from "../../../../models/menus.model.ts";

type MenuEditRolesTableProps = {
    data: MenuRole[];
    rolesName: RoleName[];
    handleDelete: (menuRoleId: number) => Promise<void>;
}

export default function MenuEditRolesTable({data, rolesName, handleDelete}: MenuEditRolesTableProps) {
    const rolesIdName: Map<number, string> = new Map();

    rolesName.map((roleName) => {
        rolesIdName.set(roleName.id, roleName.name);
    });

    const menuRoles: React.JSX.Element[] = data.map(v => (
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
                {menuRoles}
                </tbody>
            </table>
        </>
    );
}