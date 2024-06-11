import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import useRolesApi from "../../../../api/roles.ts";
import {RoleName} from "../../../../models/roles.model.ts";
import {ProductRole} from "../../../../models/products.model.ts";
import ToastManager from "../../../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../../../models/toast-message.model.ts";
import ProductEditRoleAdd from "./ProductEditRoleAdd.tsx";
import ProductEditRoleTable from "./ProductEditRoleTable.tsx";

type ProductEditRolesProps = {
    productRoles: ProductRole[];
    handleDelete: (productRoleId: number) => Promise<void>;
    handleSubmit: (roleId: number) => Promise<void>;
}

export default function ProductEditRoles({productRoles, handleDelete, handleSubmit}: ProductEditRolesProps) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [newProductRoleId, setNewProductRoleId] = useState(-1);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);

    const rolesApi = useRolesApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{message, type}, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["product-edit-roles"],
        queryFn: async () => {
            const data = await rolesApi.getRolesName(true);

            return data;
        },
        enabled: true,
        staleTime: 0,
    });

    const handleNewProductRoleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProductRoleId(parseInt(event.target.value));
    };

    const handleSubmitAddRole = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newProductRoleId);

        setNewProductRoleId(-1);
    };

    useEffect(() => {
        if (data) {
            if (data.error) {
                return addToast(data.message, "error");
            }

            setRolesName(data.roles!);
        }
    }, [data]);

    return (
        <>
            <h6 className="mb-3">Roles</h6>
            <ProductEditRoleAdd rolesName={rolesName} newProductRoleId={newProductRoleId}
                                handleProductRoleIdChange={handleNewProductRoleIdChange}
                                handleSubmit={handleSubmitAddRole}/>
            <ProductEditRoleTable data={productRoles} rolesName={rolesName} handleDelete={handleDelete}/>
            <hr/>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </>
    );
}