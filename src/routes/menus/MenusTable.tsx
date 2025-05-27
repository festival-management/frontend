import React from "react";
import {Link} from "react-router-dom";

import {Menu, UseMenusApiInterface} from "../../models/menus.model.ts";
import useMenuMutations from "../../hooks/mutations/use-menu-mutations.ts";

interface MenusTableProps {
    menusApi: UseMenusApiInterface;
    menus: Menu[];
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function MenusTable({menusApi, menus, setMenus, setTotalCount}: MenusTableProps) {
    const {deleteMenuMutation} = useMenuMutations(menusApi);

    const handleDeleteMenu = async (id: number) => {
        const response = await deleteMenuMutation.mutateAsync(id);

        if (!response.error) {
            setMenus((prevState) => prevState.filter((menu) => menu.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = menus.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.short_name}</td>
            <td>{v.price}</td>
            <td>
                <Link className="btn btn-primary" to={`/menus/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteMenu(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Menus</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Short Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </table>
        </>
    );
}