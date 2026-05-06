import RoleEditTablesAdd from "./RoleEditTablesAdd.tsx";
import RoleEditTablesTable from "./RoleEditTablesTable.tsx";
import EditTables from "../../../../components/edit-tables.tsx";

export default function RoleEditTables() {
    return (
        <>
            <h6 className="mb-3">Tables</h6>
            <EditTables AddComponent={RoleEditTablesAdd} TableComponent={RoleEditTablesTable}/>
            <hr/>
        </>
    );
}
