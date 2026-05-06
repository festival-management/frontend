import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {
    CreateTableResponse,
    GetTableResponse,
    GetTablesNameResponse,
    GetTablesResponse,
    UseTablesApiInterface
} from "../models/tables.model.ts";

const useTablesApi = (): UseTablesApiInterface => {
    const {http} = useHttpClient(API.TABLES.toString());

    const addTable = async (name: string, seatStart: number, seatEnd: number) => {
        const response: AxiosResponse<CreateTableResponse> = await http.post(
            "/",
            {name, seat_start: seatStart, seat_end: seatEnd},
        );

        return response.data;
    };

    const deleteTable = async (id: number) => {
        const response: AxiosResponse<BaseResponse> = await http.delete(
            `/${id}`,
        );

        return response.data;
    };

    const getTables = async (page: number) => {
        const limit = import.meta.env.VITE_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetTablesResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit}}
        );

        return response.data;
    };

    const getTablesById = async (id: number) => {
        const response: AxiosResponse<GetTableResponse> = await http.get(
            `/${id}`
        );

        return response.data;
    };

    const getTablesName = async (orderBy?: string) => {
        const response: AxiosResponse<GetTablesNameResponse> = await http.get(
            "/",
            {params: {only_name: true, order_by: orderBy}}
        );

        return response.data;
    };

    const updateTableName = async (id: number, name: string) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/name`,
            {name}
        );

        return response.data;
    };

    const updateTableSeats = async (id: number, seatStart: number, seatEnd: number) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            `/${id}/seats`,
            {seat_start: seatStart, seat_end: seatEnd},
        );

        return response.data;
    };

    return {
        addTable,
        deleteTable,
        getTables,
        getTablesById,
        getTablesName,
        updateTableName,
        updateTableSeats
    };
}

export default useTablesApi;
