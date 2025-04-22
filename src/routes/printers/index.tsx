import {useEffect, useState} from 'react';

import PrintersTable from "./PrintersTable.tsx";
import usePrintersApi from "../../api/printers.ts";
import {Printer} from "../../models/printers.model.ts";
import CreatePrinterForm from "./CreatePrinterForm.tsx";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import PaginationControls from "../../components/pagination-controls.tsx";
import usePrinterQueries from "../../hooks/queries/use-printer-queries.ts";

export default function RoutePrinters() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [printers, setPrinters] = useState<Printer[]>([]);

    const printersApi = usePrintersApi();

    const {addToast} = useToastContext();
    const {fetchPrintersData} = usePrinterQueries(printersApi);

    const printersData = fetchPrintersData(page, "name");

    useEffect(() => {
        if (!printersData) return;

        if (printersData.error) return addToast(printersData.code, "error");

        setPrinters(printersData.printers!);
        setTotalCount(printersData.total_count!);
    }, [printersData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <CreatePrinterForm printersApi={printersApi} setPrinters={setPrinters}
                                       setTotalCount={setTotalCount}/>
                    <PrintersTable printersApi={printersApi} printers={printers} setPrinters={setPrinters}
                                   setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}