import React, {useState} from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

type ProductEditRoleAddProps = {
    rolesName: RoleName[];
}

export default function ProductEditRolesAdd({rolesName}: ProductEditRoleAddProps) {
    const [newProductRoleId, setNewProductRoleId] = useState(-1);

    const {productId, setProductRoles, productsApi} = useProductEditContext();
    const {addProductRoleMutation} = useProductMutations(productsApi);

    const handleNewProductRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProductRoleId(parseInt(event.target.value));
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addProductRoleMutation.mutateAsync({id: productId, roleId: newProductRoleId});

        if (!response.error) {
            setProductRoles((prevState) => [...prevState, response.role!]);
        }

        setNewProductRoleId(-1);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddRole}>
            <div className="input-group mb-3">
                <span className="input-group-text">Start date</span>
                <select className="form-select" id="newProductRoleId"
                        value={newProductRoleId}
                        onChange={handleNewProductRoleIdChange}>
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