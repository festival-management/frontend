import {useEffect, useState} from "react";

import SubcategoriesTable from "./SubcategoriesTable";
import useSubcategoriesApi from "../../api/subcategories";
import CreateSubcategoryForm from "./CreateSubcategoryForm";
import {Subcategory} from "../../models/subcategories.model";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import PaginationControls from "../../components/pagination-controls";
import useSubcategoryQueries from "../../hooks/queries/use-subcategory-queries.ts";

export default function RouteSubcategories() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    const subcategoriesApi = useSubcategoriesApi();

    const {addToast} = useToastContext();
    const {fetchSubcategoriesData} = useSubcategoryQueries(subcategoriesApi);

    const subcategoriesData = fetchSubcategoriesData(page, "order");

    useEffect(() => {
        if (!subcategoriesData) return;

        if (subcategoriesData.error) return addToast(subcategoriesData.code, "error");

        setSubcategories(subcategoriesData.subcategories!);
        setTotalCount(subcategoriesData.total_count!);
    }, [subcategoriesData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateSubcategoryForm subcategoriesApi={subcategoriesApi} setSubcategories={setSubcategories}
                                           setTotalCount={setTotalCount}/>
                    <SubcategoriesTable subcategoriesApi={subcategoriesApi} subcategories={subcategories}
                                        setSubcategories={setSubcategories} setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}
