import {AxiosResponse} from "axios";

import API from "../env/api.ts";
import useHttpClient from "./utils.ts";
import {GetStatisticResponse, UseStatisticsApiInterface} from "../models/statistics.model.ts";

const useStatisticsApi = (): UseStatisticsApiInterface => {
    const {http} = useHttpClient(API.STATISTICS.href);

    const getStatistic = async (startDate?: Date, endDate?: Date) => {
        const response: AxiosResponse<GetStatisticResponse> = await http.get(
            "/",
            {params: {start_date: startDate, end_date: endDate}}
        );

        return response.data;
    };

    return {getStatistic};
};

export default useStatisticsApi;
