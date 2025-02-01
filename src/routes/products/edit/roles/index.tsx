import {RoleName} from "../../../../models/roles.model.ts";
import ProductEditRolesAdd from "./ProductEditRolesAdd.tsx";
import ProductEditRolesTable from "./ProductEditRolesTable.tsx";

type ProductEditRolesProps = {
    rolesName: RoleName[];
}

export default function ProductEditRoles({rolesName}: ProductEditRolesProps) {
    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <ProductEditRolesAdd rolesName={rolesName}/>
            <ProductEditRolesTable rolesName={rolesName}/>
            <hr/>
        </>
    );
}