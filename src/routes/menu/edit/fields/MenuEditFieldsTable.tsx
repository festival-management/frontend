import React from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import MenuEditFieldNameForm from "./MenuEditFieldNameForm.tsx";
import {ProductName} from "../../../../models/products.model.ts";
import MenuEditFieldProductAdd from "./MenuEditFieldProductAdd.tsx";
import MenuEditFieldProductsTable from "./MenuEditFieldProductsTable.tsx";
import MenuEditFieldIsOptionalForm from "./MenuEditFieldIsOptionalForm.tsx";
import MenuEditFieldMaxSortableElementsForm from "./MenuEditFieldMaxSortableElementsForm.tsx";

type MenuEditFieldsTableProps = {
    productsName: ProductName[];
    data: MenuField[];
    handleChangeFieldIsOptional: (menuFieldId: number, isOptional: boolean) => Promise<void>;
    handleChangeFieldMaxSortableElements: (menuFieldId: number, maxSortableElements: number) => Promise<void>;
    handleChangeFieldName: (menuFieldId: number, name: string) => Promise<void>;
    handleSubmitAddFieldProduct: (menuFieldId: number, price: number, productId: number) => void;
    handleDelete: (menuFieldId: number) => Promise<void>;
    handleDeleteMenuFieldProduct: (menuFieldId: number, menuFieldProductId: number) => void;
}

export default function MenuEditFieldsTable({
                                                productsName,
                                                data,
                                                handleChangeFieldIsOptional,
                                                handleChangeFieldMaxSortableElements,
                                                handleChangeFieldName,
                                                handleSubmitAddFieldProduct,
                                                handleDelete,
                                                handleDeleteMenuFieldProduct
                                            }: MenuEditFieldsTableProps) {
    const menuFields: React.JSX.Element[] = data.map((v, index) => (
        <div key={index} className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                    {v.name}
                </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionField">
                <div className="accordion-body">
                    <MenuEditFieldNameForm menuFieldId={v.id} menuFieldName={v.name}
                                           handleChangeFieldName={handleChangeFieldName}/>
                    <MenuEditFieldIsOptionalForm menuFieldId={v.id} menuFieldIsOptional={v.is_optional}
                                                 handleChangeFieldIsOptional={handleChangeFieldIsOptional}/>
                    <MenuEditFieldMaxSortableElementsForm menuFieldId={v.id}
                                                          menuFieldMaxSortableElements={v.max_sortable_elements}
                                                          handleChangeFieldMaxSortableElements={handleChangeFieldMaxSortableElements}/>
                    <MenuEditFieldProductAdd menuFieldId={v.id} productsName={productsName}
                                             handleSubmit={handleSubmitAddFieldProduct}/>
                    <MenuEditFieldProductsTable menuFieldId={v.id} productsName={productsName} data={v.products}
                                                handleDeleteMenuFieldProduct={handleDeleteMenuFieldProduct}/>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(v.id)}
                    >
                        <i className="bi bi-trash"/> Delete
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="accordion" id="accordionField">
            {menuFields}
        </div>
    );
}