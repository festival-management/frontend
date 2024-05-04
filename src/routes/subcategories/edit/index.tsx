import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import BaseResponse from "../../../models/base.model";
import useSubcategoriesApi from "../../../api/subcategories";
import ErrorMessage from "../../../components/error-message";
import SuccessMessage from "../../../components/success-message";
import SubcategoryEditNameForm from "./SubcategoryEditNameForm";
import SubcategoryEditOrderForm from "./SubcategoryEditOrderForm";

export default function RouteSubcategoryEdit() {
    const {id} = useParams();

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [subcategoryName, setSubcategoryName] = useState("");
    const [subcategoryOrder, setSubcategoryOrder] = useState(0);

    const subcategoriesApi = useSubcategoriesApi();

    const {data} = useQuery({
        queryKey: ["subcategories-edit", id],
        queryFn: () => subcategoriesApi.getSubcategoryById(parseInt(id || "-1")),
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
    const updateSubcategoryNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string
        }) => subcategoriesApi.updateSubcategoryName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateSubcategoryOrderMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            order: number
        }) => subcategoriesApi.updateSubcategoryOrder(variables.id, variables.order),
        onSuccess: onSuccessMutation
    });

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubcategoryName(event.target.value);
    };

    const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubcategoryOrder(parseInt(event.target.value));
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

        updateSubcategoryNameMutation.mutate({id: parseInt(id || "-1"), name: subcategoryName});
    };

    const handleSubmitChangeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateSubcategoryOrderMutation.mutate({id: parseInt(id || "-1"), order: subcategoryOrder});
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setSubcategoryName(data.name!);
            setSubcategoryOrder(data.order!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <SuccessMessage message="Done" visible={isSaved} afterTimeout={handleAfterTimeoutSaved}/>
                    <SubcategoryEditNameForm name={subcategoryName} handleNameChange={handleNameChange}
                                             handleSubmit={handleSubmitChangeName}/>
                    <SubcategoryEditOrderForm order={subcategoryOrder} handleOrderChange={handleOrderChange}
                                              handleSubmit={handleSubmitChangeOrder}/>
                </div>
            </div>
        </div>
    );
}