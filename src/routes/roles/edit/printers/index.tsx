import RoleEditPrintersAdd from "./RoleEditPrintersAdd.tsx";
import RoleEditPrintersTable from "./RoleEditPrintersTable.tsx";
import EditPrinters from "../../../../components/edit-printers.tsx";

export default function RoleEditPrinters() {
    return (
        <>
            <h6 className="mb-3">Printers</h6>
            <EditPrinters AddComponent={RoleEditPrintersAdd} TableComponent={RoleEditPrintersTable}/>
            <hr/>
        </>
    );
}
