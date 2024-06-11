import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import BaseResponse from "../../../models/base.model";
import useSubcategoriesApi from "../../../api/subcategories";
import SubcategoryEditNameForm from "./SubcategoryEditNameForm";
import ToastManager from "../../../components/toast-manager.tsx";
import SubcategoryEditOrderForm from "./SubcategoryEditOrderForm";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";

export default function RouteSubcategoryEdit() {
    const {id} = useParams();

    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [subcategoryName, setSubcategoryName] = useState("");
    const [subcategoryOrder, setSubcategoryOrder] = useState(0);

    const subcategoriesApi = useSubcategoriesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["subcategories-edit", id],
        queryFn: () => subcategoriesApi.getSubcategoryById(parseInt(id || "-1")),
        enabled: true,
        staleTime: 0,
    });
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            return addToast(data.message, "error");
        }

        addToast("Done", "success");
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
                return addToast(data.message, "error");
            }

            setSubcategoryName(data.name!);
            setSubcategoryOrder(data.order!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <SubcategoryEditNameForm name={subcategoryName} handleNameChange={handleNameChange}
                                             handleSubmit={handleSubmitChangeName}/>
                    <SubcategoryEditOrderForm order={subcategoryOrder} handleOrderChange={handleOrderChange}
                                              handleSubmit={handleSubmitChangeOrder}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}