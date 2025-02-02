import ProductEditRolesAdd from "./ProductEditRolesAdd.tsx";
import ProductEditRolesTable from "./ProductEditRolesTable.tsx";
import EditRoles from "../../../../components/edit-roles.tsx";

export default function ProductEditRoles() {
    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <EditRoles AddComponent={ProductEditRolesAdd} TableComponent={ProductEditRolesTable}/>
            <hr/>
        </>
    );
}