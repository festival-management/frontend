import MenuEditRolesAdd from "./MenuEditRolesAdd.tsx";
import MenuEditRolesTable from "./MenuEditRolesTable.tsx";
import {RoleName} from "../../../../models/roles.model.ts";

type MenuEditRolesProps = {
    rolesName: RoleName[];
}

export default function MenuEditRoles({rolesName}: MenuEditRolesProps) {
    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <MenuEditRolesAdd rolesName={rolesName}/>
            <MenuEditRolesTable rolesName={rolesName}/>
        </>
    );
}