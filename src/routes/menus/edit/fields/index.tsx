import MenuEditFieldsAdd from "./MenuEditFieldsAdd.tsx";
import MenuEditFieldsTable from "./MenuEditFieldsTable.tsx";
import {ProductName} from "../../../../models/products.model.ts";


type MenuEditFieldsProps = {
    productsName: ProductName[];
}

export default function MenuEditFields({productsName}: MenuEditFieldsProps) {
    return (
        <>
            <h6 className="mb-3">Fields</h6>
            <MenuEditFieldsAdd/>
            <MenuEditFieldsTable productsName={productsName}/>
            <hr/>
        </>
    );
}