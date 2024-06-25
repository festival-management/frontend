import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";

import useMenusApi from "../../api/menus.ts";
import ToastManager from "../../components/toast-manager.tsx";
import {CreateMenuResponse, Menu} from "../../models/menus.model.ts";
import PaginationControls from "../../components/pagination-controls.tsx";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";
import CreateMenuForm from "./CreateMenuForm.tsx";
import MenusTable from "./MenusTable.tsx";


export default function RouteMenus() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [newMenuName, setNewMenuName] = useState("");
    const [newMenuShortName, setNewMenuShortName] = useState("");
    const [newMenuPrice, setNewMenuPrice] = useState(0);

    const menusApi = useMenusApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{message, type}, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["menus", page],
        queryFn: () => menusApi.getMenus(page, "name"),
        enabled: true,
        staleTime: 0,
    });
    const addMenuMutation = useMutation({
        mutationFn: (variables: {
            name: string,
            shortName: string,
            price: number,
        }) => menusApi.addMenu(variables.name, variables.shortName, variables.price),
        onSuccess: async (data: CreateMenuResponse) => {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setNewMenuName("");
            setNewMenuShortName("");
            setNewMenuPrice(0);

            setMenus((prevState) => [...prevState, data.menu!]);
            setTotalCount((prevState) => prevState + 1);
        }
    });
    const deleteMenuMutation = useMutation({
        mutationFn: menusApi.deleteMenu,
        onSuccess: async (data, variables) => {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setMenus((prevState) => prevState.filter((menu) => menu.id !== variables));
            setTotalCount((prevState) => prevState - 1);
        }
    });

    const handleNewMenuNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuName(event.target.value);
    };

    const handleNewMenuShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuShortName(event.target.value);
    };

    const handleNewMenuPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddMenu = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addMenuMutation.mutate({name: newMenuName, shortName: newMenuShortName, price: newMenuPrice});
    };

    const handleDeleteMenu = async (id: number) => {
        deleteMenuMutation.mutate(id);
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setMenus(data.menus!);
            setTotalCount(data.total_count!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateMenuForm name={newMenuName} handleNameChange={handleNewMenuNameChange}
                                    shortName={newMenuShortName} handleShortNameChange={handleNewMenuShortNameChange}
                                    price={newMenuPrice} handlePriceChange={handleNewMenuPriceChange}
                                    handleSubmit={handleSubmitAddMenu}/>
                    <MenusTable data={menus} handlerDeleteMenu={handleDeleteMenu}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}