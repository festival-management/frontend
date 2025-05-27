import React from "react";

import {useProductEditContext} from "../../../../contexts/ProductEditContext.tsx";
import {useProductMutations} from "../../../../hooks/mutations/use-product-mutations.ts";

export default function ProductEditDatesTable() {
    const {productId, productDates, setProductDates, productsApi} = useProductEditContext();
    const {deleteProductDateMutation} = useProductMutations(productsApi);

    const handleDeleteProductDate = async (productDateId: number) => {
        const response = await deleteProductDateMutation.mutateAsync({id: productId, productDateId});

        if (!response.error) {
            setProductDates((prevState) => prevState.filter((productDate) => productDate.id !== productDateId));
        }
    };

    const tableBody: React.JSX.Element[] = productDates.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.start_date}</td>
            <td>{v.end_date}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteProductDate(v.id)}
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
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
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