import MenuEditRolesAdd from "./MenuEditRolesAdd.tsx";
import MenuEditRolesTable from "./MenuEditRolesTable.tsx";
import EditRoles from "../../../../components/edit-roles.tsx";

export default function MenuEditRoles() {
    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <EditRoles AddComponent={MenuEditRolesAdd} TableComponent={MenuEditRolesTable}/>
        </>
    );
}