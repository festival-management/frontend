import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import useProductsApi from "../../../api/products";
import BaseResponse from "../../../models/base.model";
import ProductEditNameForm from "./ProductEditNameForm";
import ProductEditPriceForm from "./ProductEditPriceForm";
import ErrorMessage from "../../../components/error-message";
import useSubcategoriesApi from "../../../api/subcategories";
import ProductEditPriorityForm from "./ProductEditPriorityForm";
import ProductEditCategoryForm from "./ProductEditCategoryForm";
import SuccessMessage from "../../../components/success-message";
import ProductEditShortNameForm from "./ProductEditShortNameForm";
import {SubcategoryName} from "../../../models/subcategories.model";
import ProductEditSubcategoryIdForm from "./ProductEditSubcategoryIdForm";


export default function RouteProductEdit() {
    const {id} = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);
    const [productName, setProductName] = useState("");
    const [productShortName, setProductShortName] = useState("");
    const [productPriority, setProductPriority] = useState(false);
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("");
    const [productSubcategoryId, setProductSubcategoryId] = useState(-1);

    const productsApi = useProductsApi();
    const subcategoriesApi = useSubcategoriesApi();

    const {data} = useQuery({
        queryKey: ["product-edit", id],
        queryFn: async () => {
            const data = await productsApi.getProductById(parseInt(id || "-1"));
            const dataSubcategoriesName = await subcategoriesApi.getSubcategoriesName("order");

            return {product: data, subcategoriesName: dataSubcategoriesName};
        },
        enabled: true,
        staleTime: 0,
    });
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
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

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    };

    const handleAfterTimeoutSaved = () => {
        setIsSaved(false);
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

    useEffect(() => {
        if (data) {
            if (data.product.error) {
                setHasError(true);
                return setErrorMessage(data.product.message);
            }

            setProductName(data.product.name!);
            setProductShortName(data.product.short_name!);
            setProductPriority(data.product.is_priority!);
            setProductPrice(data.product.price!);
            setProductCategory(data.product.category!);
            setProductSubcategoryId(data.product.subcategory_id!);

            if (data.subcategoriesName.error) {
                setHasError(true);
                return setErrorMessage(data.subcategoriesName.message);
            }

            setSubcategoriesName(data.subcategoriesName.subcategories!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <SuccessMessage message="Done" visible={isSaved} afterTimeout={handleAfterTimeoutSaved}/>
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
                </div>
            </div>
        </div>
    );
}