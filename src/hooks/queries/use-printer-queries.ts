import {useQuery} from "@tanstack/react-query";

import {
    GetPrinterResponse,
    GetPrintersNameResponse,
    GetPrintersResponse,
    UsePrintersApiInterface
} from "../../models/printers.model.ts";

const UsePrinterQueries = (printersApi: UsePrintersApiInterface) => {
    const fetchPrinterDetails = (id: number): GetPrinterResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["printers-details", id],
            queryFn: () => printersApi.getPrinterById(id),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchPrintersName = (orderBy?: string): GetPrintersNameResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["printers-name", orderBy],
            queryFn: () => printersApi.getPrintersName(orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchPrintersData = (page: number, orderBy?: string): GetPrintersResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["printers", page, orderBy],
            queryFn: () => printersApi.getPrinters(page, orderBy),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchPrinterDetails, fetchPrintersName, fetchPrintersData};
};

export default UsePrinterQueries;