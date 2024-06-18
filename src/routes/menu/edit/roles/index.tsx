import React, {useState} from "react";

import MenuEditRolesAdd from "./MenuEditRolesAdd.tsx";
import MenuEditRolesTable from "./MenuEditRolesTable.tsx";
import {RoleName} from "../../../../models/roles.model.ts";
import {MenuRole} from "../../../../models/menus.model.ts";

type MenuEditRolesProps = {
    rolesName: RoleName[];
    menuRoles: MenuRole[];
    handleDelete: (menuRoleId: number) => Promise<void>;
    handleSubmit: (roleId: number) => Promise<void>;
}

export default function MenuEditRoles({rolesName, menuRoles, handleDelete, handleSubmit}: MenuEditRolesProps) {
    const [newMenuRoleId, setNewMenuRoleId] = useState(-1);

    const handleNewMenuRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewMenuRoleId(parseInt(event.target.value));
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newMenuRoleId);

        setNewMenuRoleId(-1);
    };

    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <MenuEditRolesAdd rolesName={rolesName} newMenuRoleId={newMenuRoleId}
                              handleMenuRoleIdChange={handleNewMenuRoleIdChange} handleSubmit={handleSubmitAddRole}/>
            <MenuEditRolesTable data={menuRoles} rolesName={rolesName} handleDelete={handleDelete}/>
        </>
    );
}