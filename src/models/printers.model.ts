import BaseResponse from "./base.model";

export interface Printer {
    id: number;
    name: string;
    ip_address: string;
}

export interface PrinterName {
    id: number;
    name: string;
}

export interface CreatePrinterResponse extends BaseResponse {
    printer: Printer;
}

export interface GetPrinterResponse extends BaseResponse, Partial<Printer> {
}

export interface GetPrintersResponse extends BaseResponse {
    total_count?: number;
    printers: Printer[];
}

export interface GetPrintersNameResponse extends BaseResponse {
    total_count?: number;
    printers: PrinterName[];
}

// Interface for the usePrintersApi hook
export interface UsePrintersApiInterface {
    addPrinter(name: string, ipAddress: string): Promise<CreatePrinterResponse>;
    deletePrinter(id: number): Promise<BaseResponse>;
    getPrinterById(id: number): Promise<GetPrinterResponse>;
    getPrinters(page: number, orderBy?: string): Promise<GetPrintersResponse>;
    getPrintersName(orderBy?: string): Promise<GetPrintersNameResponse>;
    updatePrinterIpAddress(id: number, ipAddress: string): Promise<BaseResponse>;
    updatePrinterName(id: number, name: string): Promise<BaseResponse>;
}
