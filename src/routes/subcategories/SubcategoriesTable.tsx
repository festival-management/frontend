import React from "react";
import {Link} from "react-router-dom";

import useSubcategoryMutations from "../../hooks/mutations/use-subcategory-mutations.ts";
import {Subcategory, UseSubcategoriesApiInterface} from "../../models/subcategories.model";

interface SubcategoriesTableProps {
    subcategoriesApi: UseSubcategoriesApiInterface;
    subcategories: Subcategory[];
    setSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function SubcategoriesTable({
                                               subcategoriesApi,
                                               subcategories,
                                               setSubcategories,
                                               setTotalCount
                                           }: SubcategoriesTableProps) {
    const {deleteSubcategoryMutation} = useSubcategoryMutations(subcategoriesApi);

    const handleDeleteSubcategory = async (id: number) => {
        const response = await deleteSubcategoryMutation.mutateAsync(id);

        if (!response.error) {
            setSubcategories((prevState) => prevState.filter((subcategory) => subcategory.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = subcategories.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>
                <Link className="btn btn-primary" to={`/subcategories/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteSubcategory(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Subcategories</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
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