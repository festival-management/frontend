import React from "react";

import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditIngredientsTable() {
    const {productId, productIngredients, setProductIngredients, productsApi} = useProductEditContext();
    const {deleteProductIngredientMutation} = useProductMutations(productsApi);

    const handleDeleteProductIngredient = async (productIngredientId: number) => {
        const response = await deleteProductIngredientMutation.mutateAsync({id: productId, productIngredientId});

        if (!response.error) {
            setProductIngredients((prevState) => prevState.filter((productIngredient) => productIngredient.id !== productIngredientId));
        }
    };

    const tableBody: React.JSX.Element[] = productIngredients.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.price}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteProductIngredient(v.id)}
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