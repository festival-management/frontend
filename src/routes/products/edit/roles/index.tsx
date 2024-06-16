import React, {useState} from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import ProductEditRolesAdd from "./ProductEditRolesAdd.tsx";
import ProductEditRolesTable from "./ProductEditRolesTable.tsx";
import {ProductRole} from "../../../../models/products.model.ts";

type ProductEditRolesProps = {
    rolesName: RoleName[];
    productRoles: ProductRole[];
    handleDelete: (productRoleId: number) => Promise<void>;
    handleSubmit: (roleId: number) => Promise<void>;
}

export default function ProductEditRoles({rolesName, productRoles, handleDelete, handleSubmit}: ProductEditRolesProps) {
    const [newProductRoleId, setNewProductRoleId] = useState(-1);

    const handleNewProductRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProductRoleId(parseInt(event.target.value));
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newProductRoleId);

        setNewProductRoleId(-1);
    };

    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <ProductEditRolesAdd rolesName={rolesName} newProductRoleId={newProductRoleId}
                                 handleProductRoleIdChange={handleNewProductRoleIdChange}
                                 handleSubmit={handleSubmitAddRole}/>
            <ProductEditRolesTable data={productRoles} rolesName={rolesName} handleDelete={handleDelete}/>
            <hr/>
        </>
    );
}