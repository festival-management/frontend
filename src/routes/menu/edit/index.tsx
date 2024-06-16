import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import MenuEditDates from "./dates";
import useMenusApi from "../../../api/menus.ts";
import useRolesApi from "../../../api/roles.ts";
import MenuEditNameForm from "./MenuEditNameForm.tsx";
import MenuEditPriceForm from "./MenuEditPriceForm.tsx";
import {RoleName} from "../../../models/roles.model.ts";
import BaseResponse from "../../../models/base.model.ts";
import MenuEditShortNameForm from "./MenuEditShortNameForm.tsx";
import ToastManager from "../../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../../models/toast-message.model.ts";
import {AddMenuDateResponse, AddMenuRoleResponse, MenuDate, MenuRole} from "../../../models/menus.model.ts";
import MenuEditRoles from "./roles";


export default function RouteMenuEdit() {
    const {id} = useParams();

    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [menuName, setMenuName] = useState("");
    const [menuShortName, setMenuShortName] = useState("");
    const [menuPrice, setMenuPrice] = useState(0);
    const [menuDates, setMenuDates] = useState<MenuDate[]>([]);
    const [menuRoles, setMenuRoles] = useState<MenuRole[]>([]);

    const menusApi = useMenusApi();
    const rolesApi = useRolesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
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

    const handleSubmitAddDate = async (startDate: string, endDate: string) => {
        addMenuDateMutation.mutate({id: parseInt(id || "-1"), startDate, endDate});
    };

    const handleDeleteMenuDate = async (menuDateId: number) => {
        deleteMenuDateMutation.mutate({id: parseInt(id || "-1"), menuDateId});
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
                    <MenuEditRoles rolesName={rolesName} menuRoles={menuRoles} handleDelete={handleDeleteMenuRole} handleSubmit={handleSubmitAddRole}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}