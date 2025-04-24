import React, {useEffect, useState} from "react";

import {PrinterName} from "../models/printers.model.ts";
import usePrintersApi from "../api/printers.ts";
import {useToastContext} from "../contexts/ToastContext.tsx";
import usePrinterQueries from "../hooks/queries/use-printer-queries.ts";

type EditPrintersProps = {
    AddComponent: React.ComponentType<{ printersName: PrinterName[]}>;
    TableComponent: React.ComponentType<{ printersName: PrinterName[]}>;
};

export default function EditPrinters({AddComponent, TableComponent}: EditPrintersProps) {
    const [printersName, setPrintersName] = useState<PrinterName[]>([]);

    const printersApi = usePrintersApi();

    const {addToast} = useToastContext();
    const {fetchPrintersName} = usePrinterQueries(printersApi);

    const printersNameData = fetchPrintersName("name");

    useEffect(() => {
        if (!printersNameData) return;
        if (printersNameData.error) return addToast(printersNameData.code, "error");

        setPrintersName(printersNameData.printers!);
    }, [printersNameData]);

    return (
        <>
            <AddComponent printersName={printersName}/>
            <TableComponent printersName={printersName}/>
        </>
    );
}