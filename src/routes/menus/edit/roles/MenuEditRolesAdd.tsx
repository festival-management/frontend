import React, {useState} from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditRolesAddProps = {
    rolesName: RoleName[];
}

export default function MenuEditRolesAdd({rolesName}: MenuEditRolesAddProps) {
    const [newMenuRoleId, setNewMenuRoleId] = useState(-1);

    const {menusApi, menuId, setMenuRoles} = useMenuEditContext();
    const {addMenuRoleMutation} = useMenuMutations(menusApi);

    const handleNewMenuRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewMenuRoleId(parseInt(event.target.value));
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addMenuRoleMutation.mutateAsync({id: menuId, roleId: newMenuRoleId});

        if (!response.error) {
            setMenuRoles((prevState) => [...prevState, response.role!]);
        }

        setNewMenuRoleId(-1);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddRole}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <select className="form-select" id="newMenuRoleId"
                        value={newMenuRoleId}
                        onChange={handleNewMenuRoleIdChange}>
                    <option value="-1">Select Roles</option>
                    {Object.values(rolesName).map(roleName => (
                        <option key={roleName.id} value={roleName.id}>{roleName.name}</option>
                    ))}
                </select>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}