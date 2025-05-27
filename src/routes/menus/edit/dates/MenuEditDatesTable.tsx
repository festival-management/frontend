import React from "react";

import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

export default function MenuEditDatesTable() {
    const {menusApi, menuId, menuDates, setMenuDates} = useMenuEditContext();
    const {deleteMenuDateMutation} = useMenuMutations(menusApi);

    const handleDeleteMenuDate = async (menuDateId: number) => {
        const response = await deleteMenuDateMutation.mutateAsync({id: menuId, menuDateId});

        if (!response.error) {
            setMenuDates((prevState) => prevState.filter((menuDate) => menuDate.id !== menuDateId));
        }
    };

    const tableBody: React.JSX.Element[] = menuDates.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.start_date}</td>
            <td>{v.end_date}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteMenuDate(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
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