import React, {useState} from "react";

import MenuEditFieldsAdd from "./MenuEditFieldsAdd.tsx";
import {MenuField} from "../../../../models/menus.model.ts";
import MenuEditFieldsTable from "./MenuEditFieldsTable.tsx";
import {ProductName} from "../../../../models/products.model.ts";


type MenuEditFieldsProps = {
    productsName: ProductName[];
    menuFields: MenuField[];
    handleChangeFieldIsOptional: (menuFieldId: number, isOptional: boolean) => Promise<void>;
    handleChangeFieldMaxSortableElements: (menuFieldId: number, maxSortableElements: number) => Promise<void>;
    handleChangeFieldName: (menuFieldId: number, name: string) => Promise<void>;
    handleDelete: (menuFieldId: number) => Promise<void>;
    handleSubmit: (name: string, maxSortableElements: number) => Promise<void>;
    handleSubmitAddFieldProduct: (menuFieldId: number, price: number, productId: number) => void;
    handleDeleteMenuFieldProduct: (menuFieldId: number, menuFieldProductId: number) => void;
}

export default function MenuEditFields({
                                           productsName,
                                           menuFields,
                                           handleChangeFieldIsOptional,
                                           handleChangeFieldMaxSortableElements,
                                           handleChangeFieldName,
                                           handleDelete,
                                           handleSubmit,
                                           handleSubmitAddFieldProduct,
                                           handleDeleteMenuFieldProduct
                                       }: MenuEditFieldsProps) {
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
            <MenuEditFieldsTable productsName={productsName} data={menuFields}
                                 handleChangeFieldIsOptional={handleChangeFieldIsOptional}
                                 handleChangeFieldMaxSortableElements={handleChangeFieldMaxSortableElements}
                                 handleChangeFieldName={handleChangeFieldName}
                                 handleSubmitAddFieldProduct={handleSubmitAddFieldProduct}
                                 handleDelete={handleDelete}
                                 handleDeleteMenuFieldProduct={handleDeleteMenuFieldProduct}/>
            <hr/>
        </>
    );
}