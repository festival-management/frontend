import React, {useEffect, useState} from "react";

import useProductsApi from "../../../../api/products.ts";
import MenuEditFieldNameForm from "./MenuEditFieldNameForm.tsx";
import {ProductName} from "../../../../models/products.model.ts";
import MenuEditFieldProductAdd from "./MenuEditFieldProductAdd.tsx";
import {useToastContext} from "../../../../contexts/ToastContext.tsx";
import MenuEditFieldProductsTable from "./MenuEditFieldProductsTable.tsx";
import MenuEditFieldIsOptionalForm from "./MenuEditFieldIsOptionalForm.tsx";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useProductQueries from "../../../../hooks/queries/use-product-queries.ts";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";
import MenuEditFieldAdditionalCostForm from "./MenuEditFieldAdditionalCostForm.tsx";
import MenuEditFieldMaxSortableElementsForm from "./MenuEditFieldMaxSortableElementsForm.tsx";

export default function MenuEditFieldsTable() {
    const [productsName, setProductsName] = useState<ProductName[]>([]);

    const productsApi = useProductsApi();

    const {addToast} = useToastContext();
    const {menusApi, menuId, menuFields, setMenuFields} = useMenuEditContext();
    const {deleteMenuFieldMutation} = useMenuMutations(menusApi);
    const {fetchProductsName} = useProductQueries(productsApi);

    const productsNameData = fetchProductsName("name");

    const handleDeleteMenuField = async (menuFieldId: number) => {
        const response = await deleteMenuFieldMutation.mutateAsync({id: menuId, menuFieldId});

        if (!response.error) {
            setMenuFields((prevState) => prevState.filter((menuField) => menuField.id !== menuFieldId));
        }
    };

    useEffect(() => {
        if (!productsNameData) return;

        if (productsNameData.error) return addToast(productsNameData.code, "error");

        setProductsName(productsNameData.products!);
    }, [productsNameData]);

    const menuFieldsData: React.JSX.Element[] = menuFields.map((v, index) => (
        <div key={index} className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                    {v.name}
                </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionField">
                <div className="accordion-body">
                    <MenuEditFieldNameForm menuField={v}/>
                    <MenuEditFieldIsOptionalForm menuField={v}/>
                    <MenuEditFieldMaxSortableElementsForm menuField={v}/>
                    <MenuEditFieldAdditionalCostForm menuField={v}/>
                    <MenuEditFieldProductAdd menuField={v} productsName={productsName}/>
                    <MenuEditFieldProductsTable menuField={v} productsName={productsName}/>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteMenuField(v.id)}
                    >
                        <i className="bi bi-trash"/> Delete
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="accordion" id="accordionField">
            {menuFieldsData}
        </div>
    );
}