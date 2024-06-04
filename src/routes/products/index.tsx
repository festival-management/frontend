import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

import useProductsApi from "../../api/products";
import {Product} from "../../models/products.model";
import useSubcategoriesApi from "../../api/subcategories";
import ErrorMessage from "../../components/error-message";
import {SubcategoryName} from "../../models/subcategories.model";
import CreateProductForm from "./CreateProductForm";
import SelectProductSubcategoryId from "./SelectProductSubcategoryId";
import PaginationControls from "../../components/pagination-controls";
import ProductsTable from "./ProductsTable";

export default function RouteProducts() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);
    const [newProductName, setNewProductName] = useState("");
    const [newProductShortName, setNewProductShortName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState(0);
    const [newProductCategory, setNewProductCategory] = useState("-1");

    const subcategoriesApi = useSubcategoriesApi();
    const productsApi = useProductsApi();

    const {data: dataSubcategories} = useQuery({
        queryKey: ["products-subcategories"],
        queryFn: () => subcategoriesApi.getSubcategoriesName("order"),
        enabled: true,
        staleTime: 0,
    });
    const addProductMutation = useMutation({
        mutationFn: (variables: {
            name: string,
            shortName: string,
            price: number,
            category: string,
            subcategoryId: number
        }) => productsApi.addProduct(variables.name, variables.shortName, variables.price, variables.category, variables.subcategoryId),
        onSuccess: async (data) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setNewProductName("");
            setNewProductShortName("");
            setNewProductPrice(0);
            setNewProductCategory("-1");

            if (totalCount === 0)
                setTotalCount(1);

            setProducts((prevState) => [...prevState, data.product!]);
        }
    });
    const getProductBySubcategoryIdMutation = useMutation({
        mutationFn: (variables: {
            page: number,
            selectedSubcategoryId: number,
            orderBy: string
        }) => productsApi.getProducts(variables.page, variables.selectedSubcategoryId, variables.orderBy),
        onSuccess: async (data) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setProducts(data.products!);
            setTotalCount(data.total_count!);
        }
    });
    const deleteProductMutation = useMutation({
        mutationFn: productsApi.deleteProduct,
        onSuccess: async (data, variables) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            if (products.length === 1)
                setTotalCount(0);

            setProducts((prevState) => prevState.filter((product) => product.id !== variables));
        }
    });

    const handleSelectedSubcategoryIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const v = parseInt(event.target.value);

        setSelectedSubcategoryId(v);

        getProductBySubcategoryIdMutation.mutate({
            page: page,
            selectedSubcategoryId: v,
            orderBy: "name"
        });
    };

    const handleNewProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductName(event.target.value);
    };

    const handleNewProductShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductShortName(event.target.value);
    };

    const handleNewProductPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductPrice(parseInt(event.target.value));
    };

    const handleNewProductCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProductCategory(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    };

    const handleAddProduct = async () => {
        addProductMutation.mutate({
            name: newProductName,
            shortName: newProductShortName,
            price: newProductPrice,
            category: newProductCategory,
            subcategoryId: selectedSubcategoryId
        });
    };

    const handleDeleteProduct = async (id: number) => {
        deleteProductMutation.mutate(id);
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
                    <SelectProductSubcategoryId selectedSubcategoryId={selectedSubcategoryId}
                                                subcategoriesName={subcategoriesName}
                                                handleSelectedSubcategoryIdChange={handleSelectedSubcategoryIdChange}/>
                    <ProductsTable data={products} handlerDeleteProduct={handleDeleteProduct}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                    <CreateProductForm name={newProductName} handleNameChange={handleNewProductNameChange}
                                       shortName={newProductShortName}
                                       handleShortNameChange={handleNewProductShortNameChange} price={newProductPrice}
                                       handlePriceChange={handleNewProductPriceChange} category={newProductCategory}
                                       handleCategoryChange={handleNewProductCategoryChange}
                                       handleSubmit={handleAddProduct}/>
                </div>
            </div>
        </div>
    );
}