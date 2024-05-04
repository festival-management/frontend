import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";

import SubcategoriesTable from "./SubcategoriesTable";
import useSubcategoriesApi from "../../api/subcategories";
import ErrorMessage from "../../components/error-message";
import CreateSubcategoryForm from "./CreateSubcategoryForm";
import {Subcategory} from "../../models/subcategories.model";
import PaginationControls from "../../components/pagination-controls";

export default function RouteSubcategories() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [newSubcategoryName, setNewSubcategoryName] = useState("");

    const subcategoriesApi = useSubcategoriesApi();

    const {data} = useQuery({
        queryKey: ["subcategories", page],
        queryFn: () => subcategoriesApi.getSubcategories(page),
        enabled: true,
        staleTime: 0,
    });
    const addSubcategoryMutation = useMutation({
        mutationFn: subcategoriesApi.addSubcategory,
        onSuccess: async (data) => {
            if (data.error) {
                setHasError(true);
                setErrorMessage(data.message);
                return;
            }

            setNewSubcategoryName("");

            setSubcategories((prevState) => [...prevState, data.subcategory!]);
        }
    });
    const deleteSubcategoryMutation = useMutation({
        mutationFn: subcategoriesApi.deleteSubcategory,
        onSuccess: async (data, variables) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setSubcategories((prevState) => prevState.filter((subcategory) => subcategory.id !== variables));
        }
    });

    const handleNewSubcategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubcategoryName(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
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
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setSubcategories(data.subcategories!);
            setTotalCount(data.total_count!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <CreateSubcategoryForm name={newSubcategoryName} handleNameChange={handleNewSubcategoryNameChange} handleSubmit={handleSubmitAddSubcategory}/>
                    <SubcategoriesTable data={subcategories} handlerDeleteSubcategory={handleDeleteSubcategory}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}
