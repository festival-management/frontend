import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import useSubcategoriesApi from "../../../api/subcategories";
import SubcategoryEditNameForm from "./SubcategoryEditNameForm";
import SubcategoryEditOrderForm from "./SubcategoryEditOrderForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import {Subcategory} from "../../../models/subcategories.model.ts";
import useSubcategoryQueries from "../../../hooks/queries/use-subcategory-queries.ts";

export default function RouteSubcategoryEdit() {
    const {id} = useParams();

    const [subcategory, setSubcategory] = useState<Subcategory>();

    const subcategoriesApi = useSubcategoriesApi();

    const {addToast} = useToastContext();
    const {fetchSubcategoryDetails} = useSubcategoryQueries(subcategoriesApi);

    const subcategoryData = fetchSubcategoryDetails(parseInt(id || "-1"));

    useEffect(() => {
        if (!subcategoryData) return;

        if (subcategoryData.error) return addToast(subcategoryData.code, "error");

        setSubcategory(subcategoryData as Subcategory);
    }, [subcategoryData]);

    if (!subcategory) return;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <SubcategoryEditNameForm subcategoriesApi={subcategoriesApi} subcategoryId={subcategory.id}
                                             subcategoryName={subcategory.name}/>
                    <SubcategoryEditOrderForm subcategoriesApi={subcategoriesApi} subcategoryId={subcategory.id}
                                              subcategoryOrder={subcategory.order}/>
                </div>
            </div>
        </div>
    );
}