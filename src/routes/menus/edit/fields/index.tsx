import MenuEditFieldsAdd from "./MenuEditFieldsAdd.tsx";
import MenuEditFieldsTable from "./MenuEditFieldsTable.tsx";

export default function MenuEditFields() {
    return (
        <>
            <h6 className="mb-3">Fields</h6>
            <MenuEditFieldsAdd/>
            <MenuEditFieldsTable/>
            <hr/>
        </>
    );
}