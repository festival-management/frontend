import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import MenuEditRoles from "./roles";
import MenuEditDates from "./dates";
import MenuEditFields from "./fields";
import useRolesApi from "../../../api/roles.ts";
import useProductsApi from "../../../api/products.ts";
import MenuEditNameForm from "./MenuEditNameForm.tsx";
import MenuEditPriceForm from "./MenuEditPriceForm.tsx";
import {RoleName} from "../../../models/roles.model.ts";
import {ProductName} from "../../../models/products.model.ts";
import MenuEditShortNameForm from "./MenuEditShortNameForm.tsx";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useMenuQueries from "../../../hooks/queries/use-menu-queries.ts";
import {useMenuEditContext} from "../../../contexts/MenuEditContext.tsx";

export default function RouteMenuEdit() {
    const {id} = useParams();

    const [rolesName, setRolesName] = useState<RoleName[]>([]);
    const [productsName, setProductsName] = useState<ProductName[]>([]);

    const rolesApi = useRolesApi();
    const productsApi = useProductsApi();

    const {addToast} = useToastContext();
    const {
        setMenuId,
        setMenuName,
        setMenuShortName,
        setMenuPrice,
        setMenuDates,
        setMenuFields,
        setMenuRoles,
        menusApi
    } = useMenuEditContext();
    const {fetchMenuDetails} = useMenuQueries(menusApi);

    const data = fetchMenuDetails(parseInt(id || "-1"), rolesApi, productsApi);

    useEffect(() => {
        if (!data) return;

        if (data.menu.error) return addToast(data.menu.code, "error");
        if (data.rolesName.error) return addToast(data.rolesName.code, "error");
        if (data.productsName.error) return addToast(data.productsName.code, "error");

        setMenuId(parseInt(id || "-1"));
        setMenuName(data.menu.name!);
        setMenuShortName(data.menu.short_name!);
        setMenuPrice(data.menu.price!);
        setMenuDates(data.menu.dates!);
        setMenuFields(data.menu.fields!);
        setMenuRoles(data.menu.roles!);
        setRolesName(data.rolesName.roles!);
        setProductsName(data.productsName.products!);
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <MenuEditNameForm/>
                    <MenuEditShortNameForm/>
                    <MenuEditPriceForm/>
                    <MenuEditDates/>
                    <MenuEditFields productsName={productsName}/>
                    <MenuEditRoles rolesName={rolesName}/>
                </div>
            </div>
        </div>
    );
}