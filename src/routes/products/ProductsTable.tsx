import React from "react";
import {Link} from "react-router-dom";

import {Product, UseProductsApiInterface} from "../../models/products.model";
import {useProductMutations} from "../../hooks/mutations/use-product-mutations.ts";

interface ProductsTableProps {
    productsApi: UseProductsApiInterface;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductsTable({productsApi, products, setProducts, setTotalCount}: ProductsTableProps) {
    const {deleteProductMutation} = useProductMutations(productsApi);

    const handleDeleteProduct = async (id: number) => {
        const response = await deleteProductMutation.mutateAsync(id);

        if (!response.error) {
            setProducts((prevState) => prevState.filter((product) => product.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = products.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.short_name}</td>
            <td>{v.is_priority ? "Yes" : "No"}</td>
            <td>{v.price}</td>
            <td>{v.category}</td>
            <td>
                <Link className="btn btn-primary" to={`/products/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Products</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Short Name</th>
                    <th scope="col">Is Priority</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
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