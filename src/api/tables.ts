import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {CreateTableResponse, GetTablesResponse, UseTablesApiInterface} from "../models/tables.model.ts";

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

    return {addTable, deleteTable, getTables};
}

export default useTablesApi;
