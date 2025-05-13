import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {
    CreatePrinterResponse,
    GetPrinterResponse,
    GetPrintersNameResponse,
    GetPrintersResponse,
    UsePrintersApiInterface
} from "../models/printers.model.ts";

const usePrintersApi = (): UsePrintersApiInterface => {
    const {http} = useHttpClient(API.PRINTERS.href);

    const addPrinter = async (name: string, ipAddress: string) => {
        const response: AxiosResponse<CreatePrinterResponse> = await http.post(
            "/",
            {name, ip_address: ipAddress},
        );

        return response.data;
    };

    const deletePrinter = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getPrinterById = async (id: number) => {
        const response: AxiosResponse<GetPrinterResponse> = await http.get(
            `/${id}`,
        );

        return response.data;
    };

    const getPrinters = async (page: number, orderBy?: string) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetPrintersResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit, order_by: orderBy}}
        );

        return response.data;
    };

    const getPrintersName = async (orderBy?: string) => {
        const response: AxiosResponse<GetPrintersNameResponse> = await http.get(
            "/",
            {params: {only_name: true, order_by: orderBy}}
        );

        return response.data;
    };

    const updatePrinterIpAddress = async (id: number, ipAddress: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {ip_address: ipAddress},
        );

        return response.data;
    };

    const updatePrinterName = async (id: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {name}
        );

        return response.data;
    };

    return {
        addPrinter,
        deletePrinter,
        getPrinterById,
        getPrinters,
        getPrintersName,
        updatePrinterIpAddress,
        updatePrinterName
    };
};

export default usePrintersApi;
