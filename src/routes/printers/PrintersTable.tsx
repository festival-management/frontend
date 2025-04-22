import React from "react";
import {Link} from "react-router-dom";

import {Printer, UsePrintersApiInterface} from "../../models/printers.model.ts";
import usePrinterMutations from "../../hooks/mutations/use-printer-mutations.ts";

interface PrintersTableProps {
    printersApi: UsePrintersApiInterface;
    printers: Printer[];
    setPrinters: React.Dispatch<React.SetStateAction<Printer[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PrintersTable({printersApi, printers, setPrinters, setTotalCount}: PrintersTableProps) {
    const {deletePrinterMutation} = usePrinterMutations(printersApi);

    const handleDeletePrinter = async (id: number) => {
        const response = await deletePrinterMutation.mutateAsync(id);

        if (!response.error) {
            setPrinters((prevState) => prevState.filter((printer) => printer.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = printers.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.ip_address}</td>
            <td>
                <Link className="btn btn-primary" to={`/printers/edit/${v.id}`} role="button">
                    <i className="bi bi-pen"/>
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeletePrinter(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Printers</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Ip address</th>
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