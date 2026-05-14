import {useQuery} from "@tanstack/react-query";

import {
    GetPendingStatisticResponse,
    GetStatisticResponse,
    UseStatisticsApiInterface
} from "../../models/statistics.model.ts";

const useStatisticsQueries = (statisticsApi: UseStatisticsApiInterface) => {
    const fetchStatisticDetails = (startDate?: Date, endDate?: Date, roleIds?: number[]): GetStatisticResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["statistics-details", startDate, endDate, roleIds],
            queryFn: () => statisticsApi.getStatistic(startDate, endDate, roleIds),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    const fetchPendingStatisticDetails = (onlyConfirmedOrder: boolean, roleIds?: number[]): GetPendingStatisticResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["pending-statistics-details", roleIds, onlyConfirmedOrder],
            queryFn: () => statisticsApi.getPendingStatistic(onlyConfirmedOrder, roleIds),
            enabled: true,
            staleTime: 0,
            refetchInterval: 15000,
            refetchOnWindowFocus: false,
        });

        return data;
    };

    return {fetchStatisticDetails, fetchPendingStatisticDetails};
};

export default useStatisticsQueries;
