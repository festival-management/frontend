import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import MenuEditFieldsAdd from "./MenuEditFieldsAdd.tsx";
import MenuEditFieldsTable from "./MenuEditFieldsTable.tsx";


type MenuEditFieldsProps = {
    menuFields: MenuField[];
    handleDelete: (menuFieldId: number) => Promise<void>;
    handleSubmit: (name: string, maxSortableElements: number) => Promise<void>;
}

export default function MenuEditFields({menuFields, handleDelete, handleSubmit}: MenuEditFieldsProps) {
    const [newMenuFieldName, setNewMenuFieldName] = useState("");
    const [newMenuFieldMaxSortableElements, setNewMenuFieldMaxSortableElements] = useState(0);

    const handleMenuFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldName(event.target.value);
    };

    const handleMenuFieldMaxSortableElementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldMaxSortableElements(parseInt(event.target.value));
    };

    const handleSubmitAddField = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleSubmit(newMenuFieldName, newMenuFieldMaxSortableElements);

        setNewMenuFieldName("");
        setNewMenuFieldMaxSortableElements(0);
    };

    return (
        <>
            <h6 className="mb-3">Fields</h6>
            <MenuEditFieldsAdd newMenuFieldName={newMenuFieldName}
                               newMenuFieldMaxSortableElements={newMenuFieldMaxSortableElements}
                               handleMenuFieldNameChange={handleMenuFieldNameChange}
                               handleMenuFieldMaxSortableElementsChange={handleMenuFieldMaxSortableElementsChange}
                               handleSubmit={handleSubmitAddField}/>
            <MenuEditFieldsTable data={menuFields} handleDelete={handleDelete}/>
            <hr/>
        </>
    );
}