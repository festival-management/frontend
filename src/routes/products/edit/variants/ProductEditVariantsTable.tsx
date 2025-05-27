import React from "react";

import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditVariantsTable() {
    const {productId, productVariants, setProductVariants, productsApi} = useProductEditContext();
    const {deleteProductVariantMutation} = useProductMutations(productsApi);

    const handleDeleteProductVariant = async (productVariantId: number) => {
        const response = await deleteProductVariantMutation.mutateAsync({id: productId, productVariantId});

        if (!response.error) {
            setProductVariants((prevState) => prevState.filter((productVariant) => productVariant.id !== productVariantId));
        }
    };

    const tableBody: React.JSX.Element[] = productVariants.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.price}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteProductVariant(v.id)}
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
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
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