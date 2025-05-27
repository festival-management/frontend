import React from "react";

import {RoleName} from "../../../../models/roles.model.ts";
import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

type ProductEditRoleTableProps = {
    rolesName: RoleName[];
}

export default function ProductEditRolesTable({rolesName}: ProductEditRoleTableProps) {
    const {productId, productRoles, setProductRoles, productsApi} = useProductEditContext();
    const {deleteProductRoleMutation} = useProductMutations(productsApi);

    const rolesIdName: Map<number, string> = new Map();

    rolesName.map((roleName) => {
        rolesIdName.set(roleName.id, roleName.name);
    });

    const handleDeleteProductRole = async (productRoleId: number) => {
        const response = await deleteProductRoleMutation.mutateAsync({id: productId, productRoleId});

        if (!response.error) {
            setProductRoles((prevState) => prevState.filter((productRole) => productRole.id !== productRoleId));
        }
    };

    const tableBody: React.JSX.Element[] = productRoles.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{rolesIdName.get(v.role_id)}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteProductRole(v.id)}
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