import {AxiosResponse} from "axios";

import API from "../env/api.ts";
import useHttpClient from "./utils.ts";
import {
    GetPendingStatisticResponse,
    GetStatisticResponse,
    UseStatisticsApiInterface
} from "../models/statistics.model.ts";

const useStatisticsApi = (): UseStatisticsApiInterface => {
    const {http} = useHttpClient(API.STATISTICS.toString());

    const getStatistic = async (startDate?: Date, endDate?: Date, roleIds?: number[]) => {
        const response: AxiosResponse<GetStatisticResponse> = await http.get(
            "/",
            {params: {start_date: startDate, end_date: endDate, role_ids: roleIds?.join(",")}}
        );

        return response.data;
    };

    const getPendingStatistic = async (onlyConfirmedOrder: boolean, roleIds?: number[]) => {
        const response: AxiosResponse<GetPendingStatisticResponse> = await http.get(
            "/pending",
            {params: {role_ids: roleIds?.join(","), only_confirmed_order: onlyConfirmedOrder}}
        );

        return response.data;
    };

    return {getStatistic, getPendingStatistic};
};

export default useStatisticsApi;
