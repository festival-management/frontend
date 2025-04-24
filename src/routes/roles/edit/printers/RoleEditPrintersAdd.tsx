import React, {useState} from "react";

import {PrinterType} from "../../../../enums/printer-type.ts";
import {PrinterName} from "../../../../models/printers.model.ts";
import {useRoleEditContext} from "../../../../contexts/RoleEditContext.tsx";
import useRoleMutations from "../../../../hooks/mutations/use-role-mutations.ts";

type RoleEditPrintersAddProps = {
    printersName: PrinterName[];
}

export default function RoleEditPrintersAdd({printersName}: RoleEditPrintersAddProps) {
    const [newRolePrinterId, setNewRolePrinterId] = useState(-1);
    const [newRolePrinterType, setNewRolePrinterType] = useState("");

    const {roleId, setRolePrinters, rolesApi} = useRoleEditContext();
    const {addRolePrinterMutation} = useRoleMutations(rolesApi);

    const handleRolePrinterIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRolePrinterId(parseInt(event.target.value));
    };

    const handleRolePrinterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRolePrinterType(event.target.value);
    };

    const handleSubmitAddPrinter = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addRolePrinterMutation.mutateAsync({
            id: roleId,
            printerId: newRolePrinterId,
            printerType: newRolePrinterType
        });

        if (!response.error) {
            setRolePrinters((prevState) => [...prevState, response.printer!]);
        }

        setNewRolePrinterId(-1);
        setNewRolePrinterType("");
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddPrinter}>
            <div className="input-group mb-3">
                <span className="input-group-text">Printer</span>
                <select className="form-select" id="newtRolePrinterId"
                        value={newRolePrinterId}
                        onChange={handleRolePrinterIdChange}>
                    <option value="-1">Select Printers</option>
                    {Object.values(printersName).map(printerName => (
                        <option key={printerName.id} value={printerName.id}>{printerName.name}</option>
                    ))}
                </select>
                <span className="input-group-text">Printer type</span>
                <select className="form-select" id="newtRolePrinterType"
                        value={newRolePrinterType}
                        onChange={handleRolePrinterTypeChange}>
                    <option value="-1">Open this select menu</option>
                    {Object.values(PrinterType).map(printerType => (
                        <option key={printerType} value={printerType}>{printerType}</option>
                    ))}
                </select>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}