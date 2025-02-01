import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import ProductEditDates from "./dates";
import ProductEditRoles from "./roles";
import ProductEditVariants from "./variants";
import useRolesApi from "../../../api/roles.ts";
import ProductEditIngredients from "./ingredients";
import ProductEditNameForm from "./ProductEditNameForm";
import {RoleName} from "../../../models/roles.model.ts";
import ProductEditPriceForm from "./ProductEditPriceForm";
import useSubcategoriesApi from "../../../api/subcategories";
import ProductEditPriorityForm from "./ProductEditPriorityForm";
import ProductEditCategoryForm from "./ProductEditCategoryForm";
import ProductEditShortNameForm from "./ProductEditShortNameForm";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import {SubcategoryName} from "../../../models/subcategories.model";
import ProductEditSubcategoryIdForm from "./ProductEditSubcategoryIdForm";
import useProductQueries from "../../../hooks/queries/use-product-queries.ts";
import {useProductEditContext} from "../../../contexts/ProductEditContext.tsx";

export default function RouteProductEdit() {
    const {id} = useParams();

    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);

    const subcategoriesApi = useSubcategoriesApi();
    const rolesApi = useRolesApi();

    const {addToast} = useToastContext();
    const {
        setProductId,
        setProductName,
        setProductShortName,
        setProductPriority,
        setProductPrice,
        setProductCategory,
        setProductSubcategoryId,
        setProductDates,
        setProductIngredients,
        setProductRoles,
        setProductVariants,
        productsApi
    } = useProductEditContext();
    const {fetchProductDetails} = useProductQueries(productsApi);

    const data = fetchProductDetails(parseInt(id || "-1"), subcategoriesApi, rolesApi);

    useEffect(() => {
        if (!data) return;

        if (data.product.error) return addToast(data.product.code, "error");
        if (data.subcategoriesName.error) return addToast(data.subcategoriesName.code, "error");
        if (data.rolesName.error) return addToast(data.rolesName.code, "error");

        setProductId(data.product.id!);
        setProductName(data.product.name!);
        setProductShortName(data.product.short_name!);
        setProductPriority(data.product.is_priority!);
        setProductPrice(data.product.price!);
        setProductCategory(data.product.category!);
        setProductSubcategoryId(data.product.subcategory_id!);
        setProductDates(data.product.dates!);
        setProductIngredients(data.product.ingredients!);
        setProductRoles(data.product.roles!);
        setProductVariants(data.product.variants!);
        setSubcategoriesName(data.subcategoriesName.subcategories!);
        setRolesName(data.rolesName.roles!);
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ProductEditNameForm/>
                    <ProductEditShortNameForm/>
                    <ProductEditPriorityForm/>
                    <ProductEditPriceForm/>
                    <ProductEditCategoryForm/>
                    <ProductEditSubcategoryIdForm subcategoriesName={subcategoriesName}/>
                    <ProductEditDates/>
                    <ProductEditIngredients/>
                    <ProductEditRoles rolesName={rolesName}/>
                    <ProductEditVariants/>
                </div>
            </div>
        </div>
    );
}