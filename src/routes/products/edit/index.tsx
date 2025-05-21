import {useEffect} from "react";
import {useParams} from "react-router-dom";

import ProductEditDates from "./dates";
import ProductEditRoles from "./roles";
import ProductEditVariants from "./variants";
import ProductEditIngredients from "./ingredients";
import ProductEditNameForm from "./ProductEditNameForm";
import ProductEditPriceForm from "./ProductEditPriceForm";
import ProductEditOrderForm from "./ProductEditOrderForm.tsx";
import ProductEditPriorityForm from "./ProductEditPriorityForm";
import ProductEditCategoryForm from "./ProductEditCategoryForm";
import ProductEditShortNameForm from "./ProductEditShortNameForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import ProductEditDailyMaxSales from "./ProductEditDailyMaxSales.tsx";
import ProductEditSubcategoryIdForm from "./ProductEditSubcategoryIdForm";
import useProductQueries from "../../../hooks/queries/use-product-queries.ts";
import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";

export default function RouteProductEdit() {
    const {id} = useParams();

    const {addToast} = useToastContext();
    const {
        setProductId,
        setProductName,
        setProductShortName,
        setProductPriority,
        setProductPrice,
        setProductCategory,
        setProductOrder,
        setProductDailyMaxSales,
        setProductSubcategoryId,
        setProductDates,
        setProductIngredients,
        setProductRoles,
        setProductVariants,
        productsApi
    } = useProductEditContext();
    const {fetchProductDetails} = useProductQueries(productsApi);

    const productsData = fetchProductDetails(parseInt(id || "-1"), true, true, true, true);

    useEffect(() => {
        if (!productsData) return;

        if (productsData.error) return addToast(productsData.code, "error");

        setProductId(productsData.id!);
        setProductName(productsData.name!);
        setProductShortName(productsData.short_name!);
        setProductPriority(productsData.is_priority!);
        setProductPrice(productsData.price!);
        setProductCategory(productsData.category!);
        setProductOrder(productsData.order!);
        setProductDailyMaxSales(productsData.daily_max_sales!);
        setProductSubcategoryId(productsData.subcategory_id!);
        setProductDates(productsData.dates!);
        setProductIngredients(productsData.ingredients!);
        setProductRoles(productsData.roles!);
        setProductVariants(productsData.variants!);
    }, [productsData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ProductEditNameForm/>
                    <ProductEditShortNameForm/>
                    <ProductEditPriorityForm/>
                    <ProductEditPriceForm/>
                    <ProductEditCategoryForm/>
                    <ProductEditOrderForm/>
                    <ProductEditDailyMaxSales/>
                    <ProductEditSubcategoryIdForm/>
                    <ProductEditDates/>
                    <ProductEditIngredients/>
                    <ProductEditRoles/>
                    <ProductEditVariants/>
                </div>
            </div>
        </div>
    );
}