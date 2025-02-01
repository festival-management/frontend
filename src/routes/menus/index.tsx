import {useEffect, useState} from "react";

import MenusTable from "./MenusTable.tsx";
import useMenusApi from "../../api/menus.ts";
import {Menu} from "../../models/menus.model.ts";
import CreateMenuForm from "./CreateMenuForm.tsx";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useMenuQueries from "../../hooks/queries/use-menu-queries.ts";
import PaginationControls from "../../components/pagination-controls.tsx";

export default function RouteMenus() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [menus, setMenus] = useState<Menu[]>([]);

    const menusApi = useMenusApi();

    const {addToast} = useToastContext();
    const {fetchMenusData} = useMenuQueries(menusApi);

    const data = fetchMenusData(page, "name");

    useEffect(() => {
        if (!data) return;

        if (data.error) return addToast(data.code, "error");

        setMenus(data.menus!);
        setTotalCount(data.total_count!);
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreateMenuForm menusApi={menusApi} setMenus={setMenus} setTotalCount={setTotalCount}/>
                    <MenusTable menusApi={menusApi} menus={menus} setMenus={setMenus} setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}