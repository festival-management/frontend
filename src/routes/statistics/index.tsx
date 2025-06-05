import {useEffect, useState} from "react";

import useRolesApi from "../../api/roles.ts";
import StatisticsTable from "./StatisticsTable.tsx";
import {RoleName} from "../../models/roles.model.ts";
import useStatisticsApi from "../../api/statistics.ts";
import {Statistic} from "../../models/statistics.model.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useRoleQueries from "../../hooks/queries/use-role-queries.ts";
import EditStatisticFiltersForm from "./EditStatisticFiltersForm.tsx";
import useStatisticsQueries from "../../hooks/queries/use-statistics-queries.ts";

const getDateWithTime = (daysToAdd: number, hours: number, minutes: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    date.setHours(hours, minutes, 0, 0);
    return date;
};

export default function RouteStatistics() {
    const [startDate, setStartDate] = useState<Date>(() => getDateWithTime(0, 4));
    const [endDate, setEndDate] = useState<Date>(() => getDateWithTime(1, 2));
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
    const [statistic, setStatistic] = useState<Statistic>({} as Statistic);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);

    const rolesApi = useRolesApi();
    const statisticsApi = useStatisticsApi();

    const {addToast} = useToastContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);
    const {fetchStatisticDetails} = useStatisticsQueries(statisticsApi);

    const rolesNameData = fetchRolesName(true);
    const statisticData = fetchStatisticDetails(startDate, endDate, selectedRoleIds.length > 0 ? selectedRoleIds : undefined);

    useEffect(() => {
        if (!rolesNameData) return;
        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

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
                                              setEndDate={setEndDate} selectedRoleIds={selectedRoleIds}
                                              setSelectedRoleIds={setSelectedRoleIds} rolesName={rolesName}/>
                    <StatisticsTable statistic={statistic}/>
                </div>
            </div>
        </div>
    );
}