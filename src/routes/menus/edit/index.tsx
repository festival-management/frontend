import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import MenuEditRoles from "./roles";
import MenuEditDates from "./dates";
import MenuEditFields from "./fields";
import useMenusApi from "../../../api/menus.ts";
import useRolesApi from "../../../api/roles.ts";
import useProductsApi from "../../../api/products.ts";
import MenuEditNameForm from "./MenuEditNameForm.tsx";
import MenuEditPriceForm from "./MenuEditPriceForm.tsx";
import {RoleName} from "../../../models/roles.model.ts";
import BaseResponse from "../../../models/base.model.ts";
import {ProductName} from "../../../models/products.model.ts";
import MenuEditShortNameForm from "./MenuEditShortNameForm.tsx";
import ToastManager from "../../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";
import {
    AddMenuDateResponse,
    AddMenuFieldProductResponse,
    AddMenuFieldResponse,
    AddMenuRoleResponse,
    MenuDate,
    MenuField,
    MenuRole
} from "../../../models/menus.model.ts";


export default function RouteMenuEdit() {
    const {id} = useParams();

    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [productsName, setProductsName] = useState<ProductName[]>([]);
    const [menuName, setMenuName] = useState("");
    const [menuShortName, setMenuShortName] = useState("");
    const [menuPrice, setMenuPrice] = useState(0);
    const [menuDates, setMenuDates] = useState<MenuDate[]>([]);
    const [menuFields, setMenuFields] = useState<MenuField[]>([]);
    const [menuRoles, setMenuRoles] = useState<MenuRole[]>([]);

    const menusApi = useMenusApi();
    const rolesApi = useRolesApi();
    const productsApi = useProductsApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{message, type}, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["menus-edit", id],
        queryFn: async () => {
            const data = await menusApi.getMenuById(parseInt(id || "-1"), true, true, true);
            const dataRolesName = await rolesApi.getRolesName(true);
            const dataProductsName = await productsApi.getProductsName("name");

            return {menu: data, rolesName: dataRolesName, productsName: dataProductsName};
        },
        enabled: true,
        staleTime: 0,
    });
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            return addToast(data.message, "error");
        }

        addToast("Done", "success");
    };
    const updateMenuNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => menusApi.updateMenuName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateMenuShortNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            shortName: string
        }) => menusApi.updateMenuShortName(variables.id, variables.shortName),
        onSuccess: onSuccessMutation
    });
    const updateMenuPriceMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            price: number
        }) => menusApi.updateMenuPrice(variables.id, variables.price),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldIsOptionalMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            isOptional: boolean
        }) => menusApi.updateMenuFieldIsOptional(variables.id, variables.menuFieldId, variables.isOptional),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldMaxSortableElementsMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            maxSortableElements: number
        }) => menusApi.updateMenuFieldMaxSortableElements(variables.id, variables.menuFieldId, variables.maxSortableElements),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldNameMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            name: string
        }) => menusApi.updateMenuFieldName(variables.id, variables.menuFieldId, variables.name),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuFields((prevState) => prevState.map((menuField) => menuField.id === variables.menuFieldId ? {
                    ...menuField,
                    name: variables.name
                } : menuField));
            }
        }
    });
    const addMenuDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            startDate: string,
            endDate: string
        }) => menusApi.addMenuDate(variables.id, variables.startDate, variables.endDate),
        onSuccess: async (data: AddMenuDateResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuDates((prevState) => [...prevState, data.date!])
            }
        }
    });
    const deleteMenuDateMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuDateId: number
        }) => menusApi.deleteMenuDate(variables.id, variables.menuDateId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuDates((prevState) => prevState.filter((menuDate) => menuDate.id !== variables.menuDateId));
            }
        }
    });
    const addMenuFieldMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            name: string,
            maxSortableElements: number
        }) => menusApi.addMenuField(variables.id, variables.name, variables.maxSortableElements),
        onSuccess: async (data: AddMenuFieldResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuFields((prevState) => [...prevState, data.field!])
            }
        }
    });
    const addMenuFieldProductMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            price: number,
            productId: number
        }) => menusApi.addMenuFieldProduct(variables.id, variables.menuFieldId, variables.price, variables.productId),
        onSuccess: async (data: AddMenuFieldProductResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuFields((prevState) => prevState.map((menuField) => menuField.id === variables.menuFieldId ? {
                    ...menuField,
                    products: [...menuField.products, data.field_product!]
                } : menuField))
            }
        }
    });
    const deleteMenuFieldMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number
        }) => menusApi.deleteMenuField(variables.id, variables.menuFieldId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuFields((prevState) => prevState.filter((menuField) => menuField.id !== variables.menuFieldId));
            }
        }
    });
    const deleteMenuFieldProductMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuFieldId: number,
            menuFieldProductId: number
        }) => menusApi.deleteMenuFieldProduct(variables.id, variables.menuFieldId, variables.menuFieldProductId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuFields((prevState) => prevState.map((menuField) => menuField.id === variables.menuFieldId ? {
                    ...menuField,
                    products: menuField.products.filter((menuFieldProduct) => menuFieldProduct.id !== variables.menuFieldProductId)
                } : menuField))
            }
        }
    });
    const addMenuRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            roleId: number
        }) => menusApi.addMenuRole(variables.id, variables.roleId),
        onSuccess: async (data: AddMenuRoleResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuRoles((prevState) => [...prevState, data.role!]);
            }
        }
    });
    const deleteMenuRoleMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            menuRoleId: number
        }) => menusApi.deleteMenuRole(variables.id, variables.menuRoleId),
        onSuccess: async (data: BaseResponse, variables) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuRoles((prevState) => prevState.filter((menuRole) => menuRole.id !== variables.menuRoleId));
            }
        }
    });

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuName(event.target.value);
    };

    const handleShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuShortName(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuPrice(parseFloat(event.target.value));
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuNameMutation.mutate({id: parseInt(id || "-1"), name: menuName});
    };

    const handleSubmitChangeShortName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuShortNameMutation.mutate({id: parseInt(id || "-1"), shortName: menuShortName});
    };

    const handleSubmitChangePrice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuPriceMutation.mutate({id: parseInt(id || "-1"), price: menuPrice});
    };

    const handleChangeFieldIsOptional = async (menuFieldId: number, isOptional: boolean) => {
        updateMenuFieldIsOptionalMutation.mutate({id: parseInt(id || "-1"), menuFieldId, isOptional});
    };

    const handleChangeFieldMaxSortableElements = async (menuFieldId: number, maxSortableElements: number) => {
        updateMenuFieldMaxSortableElementsMutation.mutate({id: parseInt(id || "-1"), menuFieldId, maxSortableElements});
    };

    const handleChangeFieldName = async (menuFieldId: number, name: string) => {
        updateMenuFieldNameMutation.mutate({id: parseInt(id || "-1"), menuFieldId, name});
    };

    const handleSubmitAddDate = async (startDate: string, endDate: string) => {
        addMenuDateMutation.mutate({id: parseInt(id || "-1"), startDate, endDate});
    };

    const handleDeleteMenuDate = async (menuDateId: number) => {
        deleteMenuDateMutation.mutate({id: parseInt(id || "-1"), menuDateId});
    };

    const handleSubmitAddField = async (name: string, maxSortableElements: number) => {
        addMenuFieldMutation.mutate({id: parseInt(id || "-1"), name, maxSortableElements});
    };

    const handleSubmitAddFieldProduct = async (menuFieldId: number, price: number, productId: number) => {
        addMenuFieldProductMutation.mutate({id: parseInt(id || "-1"), menuFieldId, price, productId});
    };

    const handleDeleteMenuField = async (menuFieldId: number) => {
        deleteMenuFieldMutation.mutate({id: parseInt(id || "-1"), menuFieldId});
    };

    const handleDeleteMenuFieldProduct = async (menuFieldId: number, menuFieldProductId: number) => {
        deleteMenuFieldProductMutation.mutate({id: parseInt(id || "-1"), menuFieldId, menuFieldProductId});
    };

    const handleSubmitAddRole = async (roleId: number) => {
        addMenuRoleMutation.mutate({id: parseInt(id || "-1"), roleId});
    };

    const handleDeleteMenuRole = async (menuRoleId: number) => {
        deleteMenuRoleMutation.mutate({id: parseInt(id || "-1"), menuRoleId});
    };

    useEffect(() => {
        if (data) {
            if (data.menu.error) {
                return addToast(data.menu.message, "error");
            }

            setMenuName(data.menu.name!);
            setMenuShortName(data.menu.short_name!);
            setMenuPrice(data.menu.price!);
            setMenuDates(data.menu.dates!);
            setMenuFields(data.menu.fields!);
            setMenuRoles(data.menu.roles!);

            if (data.rolesName.error) {
                return addToast(data.rolesName.message, "error");
            }

            setRolesName(data.rolesName.roles!);

            if (data.productsName.error) {
                return addToast(data.productsName.message, "error");
            }

            setProductsName(data.productsName.products!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <MenuEditNameForm name={menuName} handleNameChange={handleNameChange}
                                      handleSubmit={handleSubmitChangeName}/>
                    <MenuEditShortNameForm shortName={menuShortName} handleShortNameChange={handleShortNameChange}
                                           handleSubmit={handleSubmitChangeShortName}/>
                    <MenuEditPriceForm price={menuPrice} handlePriceChange={handlePriceChange}
                                       handleSubmit={handleSubmitChangePrice}/>
                    <MenuEditDates menuDates={menuDates} handleDelete={handleDeleteMenuDate}
                                   handleSubmit={handleSubmitAddDate}/>
                    <MenuEditFields productsName={productsName} menuFields={menuFields}
                                    handleChangeFieldIsOptional={handleChangeFieldIsOptional}
                                    handleChangeFieldMaxSortableElements={handleChangeFieldMaxSortableElements}
                                    handleChangeFieldName={handleChangeFieldName}
                                    handleSubmit={handleSubmitAddField} handleDelete={handleDeleteMenuField}
                                    handleSubmitAddFieldProduct={handleSubmitAddFieldProduct}
                                    handleDeleteMenuFieldProduct={handleDeleteMenuFieldProduct}/>
                    <MenuEditRoles rolesName={rolesName} menuRoles={menuRoles} handleDelete={handleDeleteMenuRole}
                                   handleSubmit={handleSubmitAddRole}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}