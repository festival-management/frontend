import {useEffect, useState} from 'react';

import ProductsTable from "./ProductsTable";
import useProductsApi from "../../api/products";
import {Product} from "../../models/products.model";
import CreateProductForm from "./CreateProductForm";
import useSubcategoriesApi from "../../api/subcategories";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {SubcategoryName} from "../../models/subcategories.model";
import PaginationControls from "../../components/pagination-controls";
import useProductQueries from "../../hooks/queries/use-product-queries.ts";
import useSubcategoryQueries from "../../hooks/queries/use-subcategory-queries.ts";
import SelectProductSubcategoryId from "../../components/select-product-subcategory-id.tsx";

export default function RouteProducts() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);

    const subcategoriesApi = useSubcategoriesApi();
    const productsApi = useProductsApi();

    const {addToast} = useToastContext();
    const {fetchSubcategoriesName} = useSubcategoryQueries(subcategoriesApi);
    const {fetchProductsBySubcategoryId} = useProductQueries(productsApi);

    const subcategoriesNameData = fetchSubcategoriesName("order");
    const productsData = fetchProductsBySubcategoryId(page, selectedSubcategoryId, "name");

    const handleSelectedSubcategoryIdChange = (subcategoryId: number) => {
        setSelectedSubcategoryId(subcategoryId);
    };

    useEffect(() => {
        if (!subcategoriesNameData) return;

        if (subcategoriesNameData.error) return addToast(subcategoriesNameData.code, "error");

        setSubcategoriesName(subcategoriesNameData.subcategories!);
    }, [subcategoriesNameData]);

    useEffect(() => {
        if (!productsData) return;

        if (productsData.error) return addToast(productsData.code, "error");

        setProducts(productsData.products!);
        setTotalCount(productsData.total_count!);
    }, [productsData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <SelectProductSubcategoryId selectedSubcategoryId={selectedSubcategoryId}
                                                subcategoriesName={subcategoriesName}
                                                handleSelectedSubcategoryIdChange={handleSelectedSubcategoryIdChange}/>
                    <ProductsTable productsApi={productsApi} products={products} setProducts={setProducts}
                                   setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                    <CreateProductForm productsApi={productsApi} subcategoryId={selectedSubcategoryId}
                                       setProducts={setProducts} setTotalCount={setTotalCount}/>
                </div>
            </div>
        </div>
    );
}