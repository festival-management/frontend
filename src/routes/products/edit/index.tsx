import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

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

    const subcategoriesApi = useSubcategoriesApi();

    const {data: dataSubcategories} = useQuery({
        queryKey: ["product-edit-subcategories"],
        queryFn: () => subcategoriesApi.getSubcategoriesName("order"),
        enabled: true,
        staleTime: 0,
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
    };

    const handleSubmitChangeShortName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleSubmitChangePriority = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleSubmitChangePrice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleSubmitChangeCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleSubmitChangeSubcategoryId = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (dataSubcategories) {
            if (dataSubcategories.error) {
                setHasError(true);
                return setErrorMessage(dataSubcategories.message);
            }

            setSubcategoriesName(dataSubcategories.subcategories!);
        }
    }, [dataSubcategories]);

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