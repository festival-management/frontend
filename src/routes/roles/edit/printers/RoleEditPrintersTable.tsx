import React from "react";

import {useRoleEditContext} from "../../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../../hooks/mutations/use-role-mutations.ts";
import {PrinterName} from "../../../../models/printers.model.ts";

type RoleEditPrintersTableProps = {
    printersName: PrinterName[];
}

export default function RoleEditPrintersTable({printersName}: RoleEditPrintersTableProps) {
    const {roleId, rolePrinters, setRolePrinters, rolesApi} = useRoleEditContext();
    const {deleteRolePrinterMutation} = useRoleMutations(rolesApi);

    const printersIdName: Map<number, string> = new Map();

    printersName.map((printerName) => {
        printersIdName.set(printerName.id, printerName.name);
    });

    const handleDeleteRolePrinter = async (rolePrinterId: number) => {
        const response = await deleteRolePrinterMutation.mutateAsync({id: roleId, rolePrinterId});

        if (!response.error) {
            setRolePrinters((prevState) => prevState.filter((rolePrinter) => rolePrinter.id !== rolePrinterId));
        }
    };

    const tableBody: React.JSX.Element[] = rolePrinters.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{printersIdName.get(v.printer_id)}</td>
            <td>{v.printer_type}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteRolePrinter(v.id)}
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
                    <th scope="col">Printer</th>
                    <th scope="col">Printer type</th>
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
