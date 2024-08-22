import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import ProductEditDates from "./dates";
import ProductEditRoles from "./roles";
import ProductEditVariants from "./variants";
import useRolesApi from "../../../api/roles.ts";
import ProductEditIngredients from "./ingredients";
import useProductsApi from "../../../api/products";
import BaseResponse from "../../../models/base.model";
import ProductEditNameForm from "./ProductEditNameForm";
import {RoleName} from "../../../models/roles.model.ts";
import {ErrorCodes} from "../../../errors/ErrorCodes.ts";
import ProductEditPriceForm from "./ProductEditPriceForm";
import useSubcategoriesApi from "../../../api/subcategories";
import ProductEditPriorityForm from "./ProductEditPriorityForm";
import ProductEditCategoryForm from "./ProductEditCategoryForm";
import ToastManager from "../../../components/toast-manager.tsx";
import ProductEditShortNameForm from "./ProductEditShortNameForm";
import {SubcategoryName} from "../../../models/subcategories.model";
import ProductEditSubcategoryIdForm from "./ProductEditSubcategoryIdForm";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";
import {
    AddProductDateResponse,
    AddProductIngredientResponse,
    AddProductRoleResponse,
    AddProductVariantResponse,
    ProductDate,
    ProductIngredient,
    ProductRole,
    ProductVariant
} from "../../../models/products.model";

export default function RouteProductEdit() {
    const {id} = useParams();

    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);
    const [productName, setProductName] = useState("");
    const [productShortName, setProductShortName] = useState("");
    const [productPriority, setProductPriority] = useState(false);
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [productSubcategoryId, setProductSubcategoryId] = useState(-1);
    const [productDates, setProductDates] = useState<ProductDate[]>([]);
    const [productIngredients, setProductIngredients] = useState<ProductIngredient[]>([]);
    const [productRoles, setProductRoles] = useState<ProductRole[]>([]);
    const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

    const productsApi = useProductsApi();
    const subcategoriesApi = useSubcategoriesApi();
    const rolesApi = useRolesApi();

    const addToast = (errorCode: number, type: ToastType) => {
        setToasts((prevToasts) => [{ errorCode, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["product-edit", id],
        queryFn: async () => {
            const data = await productsApi.getProductById(parseInt(id || "-1"), true, true, true, true);
            const dataSubcategoriesName = await subcategoriesApi.getSubcategoriesName("order");
            const dataRolesName = await rolesApi.getRolesName(true);

            return {product: data, subcategoriesName: dataSubcategoriesName, rolesName: dataRolesName};
        },
        enabled: true,
        staleTime: 0,
    });
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            return addToast(data.code, "error");
        }

        addToast(ErrorCodes.SUCCESS, "success");
    };
    const updateProductNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => productsApi.updateProductName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateProductShortNameMutation = useMutation({
        mutationFn: (variables: { id: number, shortName: string }) => productsApi.updateProductShortName(variables.id, variables.shortName),
        onSuccess: onSuccessMutation
    });
    const updateProductPriorityMutation = useMutation({
        mutationFn: (variables: { id: number, priority: boolean }) => productsApi.updateProductIsPriority(variables.id, variables.priority),
        onSuccess: onSuccessMutation
    });
    const updateProductPriceMutation = useMutation({
        mutationFn: (variables: { id: number, price: number }) => productsApi.updateProductPrice(variables.id, variables.price),
        onSuccess: onSuccessMutation
    });
    const updateProductCategoryMutation = useMutation({
        mutationFn: (variables: { id: number, category: string }) => productsApi.updateProductCategory(variables.id, variables.category),
        onSuccess: onSuccessMutation
    });
    const updateProductSubcategoryMutation = useMutation({
        mutationFn: (variables: { id: number, subcategoryId: number }) => productsApi.updateProductSubcategory(variables.id, variables.subcategoryId),
        onSuccess: onSuccessMutation
    });
    const addProductDateMutation = useMutation({
        mutationFn: (variables: { id: number, startDate: string, endDate: string }) => productsApi.addProductDate(variables.id, variables.startDate, variables.endDate),
        onSuccess: async (data: AddProductDateResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductDates((prevState) => [...prevState, data.date!])
            }
        }
    });
    const deleteProductDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productDateId: number
        }) => productsApi.deleteProductDate(variables.id, variables.productDateId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductDates((prevState) => prevState.filter((productDate) => productDate.id !== variables.productDateId));
            }
        }
    });
    const addProductIngredientMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string,
            price: number
        }) => productsApi.addProductIngredient(variables.id, variables.name, variables.price),
        onSuccess: async (data: AddProductIngredientResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductIngredients((prevState) => [...prevState, data.ingredient!]);
            }
        }
    });
    const deleteProductIngredientMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productIngredientId: number
        }) => productsApi.deleteProductIngredient(variables.id, variables.productIngredientId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductIngredients((prevState) => prevState.filter((productIngredient) => productIngredient.id !== variables.productIngredientId));
            }
        }
    });
    const addProductRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            roleId: number
        }) => productsApi.addProductRole(variables.id, variables.roleId),
        onSuccess: async (data: AddProductRoleResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductRoles((prevState) => [...prevState, data.role!]);
            }
        }
    });
    const deleteProductRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productRoleId: number
        }) => productsApi.deleteProductRole(variables.id, variables.productRoleId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductRoles((prevState) => prevState.filter((productRole) => productRole.id !== variables.productRoleId));
            }
        }
    });
    const addProductVariantMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string,
            price: number
        }) => productsApi.addProductVariant(variables.id, variables.name, variables.price),
        onSuccess: async (data: AddProductVariantResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductVariants((prevState) => [...prevState, data.variant!]);
            }
        }
    });
    const deleteProductVariantMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            productVariantId: number
        }) => productsApi.deleteProductVariant(variables.id, variables.productVariantId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setProductVariants((prevState) => prevState.filter((productVariant) => productVariant.id !== variables.productVariantId));
            }
        }
    });

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };

    const handleShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductShortName(event.target.value);
    };

    const handlePriorityChange = () => {
        setProductPriority((v) => !v);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(parseInt(event.target.value));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductCategory(event.target.value);
    };

    const handleSubcategoryIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductSubcategoryId(parseInt(event.target.value));
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductNameMutation.mutate({id: parseInt(id || "-1"), name: productName});
    };

    const handleSubmitChangeShortName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductShortNameMutation.mutate({id: parseInt(id || "-1"), shortName: productShortName});
    };

    const handleSubmitChangePriority = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductPriorityMutation.mutate({id: parseInt(id || "-1"), priority: productPriority});
    };

    const handleSubmitChangePrice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductPriceMutation.mutate({id: parseInt(id || "-1"), price: productPrice});
    };

    const handleSubmitChangeCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductCategoryMutation.mutate({id: parseInt(id || "-1"), category: productCategory});
    };

    const handleSubmitChangeSubcategoryId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProductSubcategoryMutation.mutate({id: parseInt(id || "-1"), subcategoryId: productSubcategoryId});
    };

    const handleSubmitAddDate = async (startDate: string, endDate: string) => {
        addProductDateMutation.mutate({id: parseInt(id || "-1"), startDate, endDate});
    };

    const handleDeleteProductDate = async (productDateId: number) => {
        deleteProductDateMutation.mutate({id: parseInt(id || "-1"), productDateId});
    };

    const handleSubmitAddIngredient = async (name: string, price: number) => {
        addProductIngredientMutation.mutate({id: parseInt(id || "-1"), name, price});
    };

    const handleDeleteProductIngredient = async (productIngredientId: number) => {
        deleteProductIngredientMutation.mutate({id: parseInt(id || "-1"), productIngredientId});
    };

    const handleSubmitAddRole = async (roleId: number) => {
        addProductRoleMutation.mutate({id: parseInt(id || "-1"), roleId});
    };

    const handleDeleteProductRole = async (productRoleId: number) => {
        deleteProductRoleMutation.mutate({id: parseInt(id || "-1"), productRoleId});
    };

    const handleSubmitAddVariant = async (name: string, price: number) => {
        addProductVariantMutation.mutate({id: parseInt(id || "-1"), name, price});
    };

    const handleDeleteProductVariant = async (productVariantId: number) => {
        deleteProductVariantMutation.mutate({id: parseInt(id || "-1"), productVariantId});
    };

    useEffect(() => {
        if (data) {
            if (data.product.error) {
                return addToast(data.product.code, "error");
            }

            setProductName(data.product.name!);
            setProductShortName(data.product.short_name!);
            setProductPriority(data.product.is_priority!);
            setProductPrice(data.product.price!);
            setProductCategory(data.product.category!);
            setProductSubcategoryId(data.product.subcategory_id!);
            setProductDates(data.product.dates || []);
            setProductIngredients(data.product.ingredients || []);
            setProductRoles(data.product.roles || []);
            setProductVariants(data.product.variants || []);

            if (data.subcategoriesName.error) {
                return addToast(data.subcategoriesName.code, "error");
            }

            setSubcategoriesName(data.subcategoriesName.subcategories!);

            if (data.rolesName.error) {
                return addToast(data.rolesName.code, "error");
            }

            setRolesName(data.rolesName.roles!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ProductEditNameForm name={productName} handleNameChange={handleNameChange}
                                         handleSubmit={handleSubmitChangeName}/>
                    <ProductEditShortNameForm shortName={productShortName} handleShortNameChange={handleShortNameChange}
                                              handleSubmit={handleSubmitChangeShortName}/>
                    <ProductEditPriorityForm priority={productPriority} handlePriorityChange={handlePriorityChange}
                                             handleSubmit={handleSubmitChangePriority}/>
                    <ProductEditPriceForm price={productPrice} handlePriceChange={handlePriceChange}
                                          handleSubmit={handleSubmitChangePrice}/>
                    <ProductEditCategoryForm category={productCategory} handleCategoryChange={handleCategoryChange}
                                             handleSubmit={handleSubmitChangeCategory}/>
                    <ProductEditSubcategoryIdForm subcategoryId={productSubcategoryId}
                                                  subcategoriesName={subcategoriesName}
                                                  handleSubcategoryIdChange={handleSubcategoryIdChange}
                                                  handleSubmit={handleSubmitChangeSubcategoryId}/>
                    <ProductEditDates productDates={productDates} handleDelete={handleDeleteProductDate}
                                      handleSubmit={handleSubmitAddDate}/>
                    <ProductEditIngredients productIngredients={productIngredients}
                                            handleDelete={handleDeleteProductIngredient} handleSubmit={handleSubmitAddIngredient}/>
                    <ProductEditRoles rolesName={rolesName} productRoles={productRoles} handleDelete={handleDeleteProductRole}
                                      handleSubmit={handleSubmitAddRole}/>
                    <ProductEditVariants productVariants={productVariants} handleDelete={handleDeleteProductVariant}
                                         handleSubmit={handleSubmitAddVariant}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}