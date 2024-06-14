import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";

import SubcategoriesTable from "./SubcategoriesTable";
import useSubcategoriesApi from "../../api/subcategories";
import CreateSubcategoryForm from "./CreateSubcategoryForm";
import {Subcategory} from "../../models/subcategories.model";
import ToastManager from "../../components/toast-manager.tsx";
import PaginationControls from "../../components/pagination-controls";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";

export default function RouteSubcategories() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [newSubcategoryName, setNewSubcategoryName] = useState("");

    const subcategoriesApi = useSubcategoriesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["subcategories", page],
        queryFn: () => subcategoriesApi.getSubcategories(page, "order"),
        enabled: true,
        staleTime: 0,
    });
    const addSubcategoryMutation = useMutation({
        mutationFn: subcategoriesApi.addSubcategory,
        onSuccess: async (data) => {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setNewSubcategoryName("");

            setSubcategories((prevState) => [...prevState, data.subcategory!]);
            setTotalCount((prevState) => prevState + 1);
        }
    });
    const deleteSubcategoryMutation = useMutation({
        mutationFn: subcategoriesApi.deleteSubcategory,
        onSuccess: async (data, variables) => {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setSubcategories((prevState) => prevState.filter((subcategory) => subcategory.id !== variables));
            setTotalCount((prevState) => prevState - 1);
        }
    });

    const handleNewSubcategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubcategoryName(event.target.value);
    };

    const handleSubmitAddSubcategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addSubcategoryMutation.mutate(newSubcategoryName);
    }

    const handleDeleteSubcategory = async (id: number) => {
        deleteSubcategoryMutation.mutate(id);
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setSubcategories(data.subcategories!);
            setTotalCount(data.total_count!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateSubcategoryForm name={newSubcategoryName} handleNameChange={handleNewSubcategoryNameChange} handleSubmit={handleSubmitAddSubcategory}/>
                    <SubcategoriesTable data={subcategories} handlerDeleteSubcategory={handleDeleteSubcategory}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}
