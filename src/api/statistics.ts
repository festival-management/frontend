import {AxiosResponse} from "axios";

import API from "../env/api.ts";
import useHttpClient from "./utils.ts";
import {GetStatisticResponse, UseStatisticsApiInterface} from "../models/statistics.model.ts";

const useStatisticsApi = (): UseStatisticsApiInterface => {
    const {http} = useHttpClient(API.STATISTICS.toString());

    const getStatistic = async (startDate?: Date, endDate?: Date, roleIds?: number[]) => {
        const response: AxiosResponse<GetStatisticResponse> = await http.get(
            "/",
            {params: {start_date: startDate, end_date: endDate, role_ids: roleIds?.join(",")}}
        );

        return response.data;
    };

    return {getStatistic};
};

export default useStatisticsApi;
