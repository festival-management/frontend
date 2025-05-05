import {useEffect, useState} from "react";

import StatisticsTable from "./StatisticsTable.tsx";
import useStatisticsApi from "../../api/statistics.ts";
import {Statistic} from "../../models/statistics.model.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useStatisticsQueries from "../../hooks/queries/use-statistics-queries.ts";
import EditStatisticFiltersForm from "./EditStatisticFiltersForm.tsx";

export default function RouteStatistics() {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [statistic, setStatistic] = useState<Statistic>({} as Statistic);

    const statisticsApi = useStatisticsApi();

    const {addToast} = useToastContext();
    const {fetchStatisticDetails} = useStatisticsQueries(statisticsApi);

    const statisticData = fetchStatisticDetails(startDate, endDate);

    useEffect(() => {
        if (!statisticData) return;

        if (statisticData.error) return addToast(statisticData.code, "error");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {error, message, code, ...statisticOnly} = statisticData;

        setStatistic(statisticOnly as Statistic);
    }, [statisticData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <EditStatisticFiltersForm startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                              setEndDate={setEndDate}/>
                    <StatisticsTable statistic={statistic}/>
                </div>
            </div>
        </div>
    );
}