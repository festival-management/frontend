import {useEffect} from "react";
import {useParams} from "react-router-dom";

import MenuEditRoles from "./roles";
import MenuEditDates from "./dates";
import MenuEditFields from "./fields";
import MenuEditNameForm from "./MenuEditNameForm.tsx";
import MenuEditPriceForm from "./MenuEditPriceForm.tsx";
import MenuEditShortNameForm from "./MenuEditShortNameForm.tsx";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useMenuQueries from "../../../hooks/queries/use-menu-queries.ts";
import {useMenuEditContext} from "../../../contexts/MenuEditContext.tsx";

export default function RouteMenuEdit() {
    const {id} = useParams();

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

    const menusData = fetchMenuDetails(parseInt(id || "-1"), true, true, true);

    useEffect(() => {
        if (!menusData) return;

        if (menusData.error) return addToast(menusData.code, "error");

        setMenuId(menusData.id!);
        setMenuName(menusData.name!);
        setMenuShortName(menusData.short_name!);
        setMenuPrice(menusData.price!);
        setMenuDates(menusData.dates!);
        setMenuFields(menusData.fields!);
        setMenuRoles(menusData.roles!);
    }, [menusData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <MenuEditNameForm/>
                    <MenuEditShortNameForm/>
                    <MenuEditPriceForm/>
                    <MenuEditDates/>
                    <MenuEditFields/>
                    <MenuEditRoles/>
                </div>
            </div>
        </div>
    );
}