import {useQuery} from "@tanstack/react-query";

import {GetStatisticResponse, UseStatisticsApiInterface} from "../../models/statistics.model.ts";

const useStatisticsQueries = (statisticsApi: UseStatisticsApiInterface) => {
    const fetchStatisticDetails = (startDate?: Date, endDate?: Date): GetStatisticResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["statistics-details", startDate, endDate],
            queryFn: () => statisticsApi.getStatistic(startDate, endDate),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchStatisticDetails};
};

export default useStatisticsQueries;
