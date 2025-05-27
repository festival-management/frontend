import React from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditRolesTableProps = {
    rolesName: RoleName[];
}

export default function MenuEditRolesTable({rolesName}: MenuEditRolesTableProps) {
    const {menusApi, menuId, menuRoles, setMenuRoles} = useMenuEditContext();
    const {deleteMenuRoleMutation} = useMenuMutations(menusApi);

    const rolesIdName: Map<number, string> = new Map();

    rolesName.map((roleName) => {
        rolesIdName.set(roleName.id, roleName.name);
    });

    const handleDeleteMenuRole = async (menuRoleId: number) => {
        const response = await deleteMenuRoleMutation.mutateAsync({id: menuId, menuRoleId});

        if (!response.error) {
            setMenuRoles((prevState) => prevState.filter((menuRole) => menuRole.id !== menuRoleId));
        }
    };

    const tableBody: React.JSX.Element[] = menuRoles.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{rolesIdName.get(v.role_id)}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteMenuRole(v.id)}
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
                {tableBody}
                </tbody>
            </table>
        </>
    );
}