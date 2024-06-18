import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import MenuEditRoles from "./roles";
import MenuEditDates from "./dates";
import MenuEditFields from "./fields";
import useMenusApi from "../../../api/menus.ts";
import useRolesApi from "../../../api/roles.ts";
import MenuEditNameForm from "./MenuEditNameForm.tsx";
import MenuEditPriceForm from "./MenuEditPriceForm.tsx";
import {RoleName} from "../../../models/roles.model.ts";
import BaseResponse from "../../../models/base.model.ts";
import MenuEditShortNameForm from "./MenuEditShortNameForm.tsx";
import ToastManager from "../../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";
import {
    AddMenuDateResponse,
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
    const [menuName, setMenuName] = useState("");
    const [menuShortName, setMenuShortName] = useState("");
    const [menuPrice, setMenuPrice] = useState(0);
    const [menuDates, setMenuDates] = useState<MenuDate[]>([]);
    const [menuFields, setMenuFields] = useState<MenuField[]>([]);
    const [menuRoles, setMenuRoles] = useState<MenuRole[]>([]);

    const menusApi = useMenusApi();
    const rolesApi = useRolesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data, refetch} = useQuery({
        queryKey: ["menu-edit", id],
        queryFn: async () => {
            const data = await menusApi.getMenuById(parseInt(id || "-1"), true, true, true);
            const dataRolesName = await rolesApi.getRolesName(true);

            return {menu: data, rolesName: dataRolesName};
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
        mutationFn: (variables: { id: number, shortName: string }) => menusApi.updateMenuShortName(variables.id, variables.shortName),
        onSuccess: onSuccessMutation
    });
    const updateMenuPriceMutation = useMutation({
        mutationFn: (variables: { id: number, price: number }) => menusApi.updateMenuPrice(variables.id, variables.price),
        onSuccess: onSuccessMutation
    });
    const updateMenuFieldNameMutation = useMutation({
        mutationFn: (variables: { id: number, menuFieldId: number, name: string }) => menusApi.updateMenuFieldName(variables.id, variables.menuFieldId, variables.name),
        onSuccess: async (data: BaseResponse) => {
            await onSuccessMutation(data);

            await refetch();
        }
    });
    const updateMenuFieldIsOptionalMutation = useMutation({
        mutationFn: (variables: { id: number, menuFieldId: number, isOptional: boolean }) => menusApi.updateMenuFieldIsOptional(variables.id, variables.menuFieldId, variables.isOptional),
        onSuccess: onSuccessMutation
    });
    const addMenuDateMutation = useMutation({
        mutationFn: (variables: { id: number, startDate: string, endDate: string }) => menusApi.addMenuDate(variables.id, variables.startDate, variables.endDate),
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
        mutationFn: (variables: { id: number, name: string, maxSortableElements: number }) => menusApi.addMenuField(variables.id, variables.name, variables.maxSortableElements),
        onSuccess: async (data: AddMenuFieldResponse) => {
            await onSuccessMutation(data);

            if (!data.error) {
                setMenuFields((prevState) => [...prevState, data.field!])
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

    const handleChangeFieldName = async (menuFieldId: number, name: string) => {
        updateMenuFieldNameMutation.mutate({id: parseInt(id || "-1"), menuFieldId, name});
    };

    const handleChangeFieldIsOptional = async (menuFieldId: number, isOptional: boolean) => {
        updateMenuFieldIsOptionalMutation.mutate({id: parseInt(id || "-1"), menuFieldId, isOptional});
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

    const handleDeleteMenuField = async (menuFieldId: number) => {
        deleteMenuFieldMutation.mutate({id: parseInt(id || "-1"), menuFieldId});
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
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <MenuEditNameForm name={menuName} handleNameChange={handleNameChange} handleSubmit={handleSubmitChangeName}/>
                    <MenuEditShortNameForm shortName={menuShortName} handleShortNameChange={handleShortNameChange} handleSubmit={handleSubmitChangeShortName}/>
                    <MenuEditPriceForm price={menuPrice} handlePriceChange={handlePriceChange} handleSubmit={handleSubmitChangePrice}/>
                    <MenuEditDates menuDates={menuDates} handleDelete={handleDeleteMenuDate} handleSubmit={handleSubmitAddDate}/>
                    <MenuEditFields menuFields={menuFields} handleChangeFieldName={handleChangeFieldName} handleChangeFieldIsOptional={handleChangeFieldIsOptional} handleDelete={handleDeleteMenuField} handleSubmit={handleSubmitAddField}/>
                    <MenuEditRoles rolesName={rolesName} menuRoles={menuRoles} handleDelete={handleDeleteMenuRole} handleSubmit={handleSubmitAddRole}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}