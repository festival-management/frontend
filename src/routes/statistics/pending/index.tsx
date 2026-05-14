import {useEffect, useState} from "react";

import useRolesApi from "../../../api/roles.ts";
import {RoleName} from "../../../models/roles.model.ts";
import useStatisticsApi from "../../../api/statistics.ts";
import PendingStatisticsTable from "./PendingStatisticTable.tsx";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import {PendingStatistic} from "../../../models/statistics.model.ts";
import useRoleQueries from "../../../hooks/queries/use-role-queries.ts";
import useStatisticsQueries from "../../../hooks/queries/use-statistics-queries.ts";
import EditPendingStatisticFiltersForm from "./EditPendingStatisticFiltersForm.tsx";

export default function RoutePendingStatistics() {
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
    const [onlyConfirmedOrder, setOnlyConfirmedOrder] = useState(false);
    const [pendingStatistic, setPendingStatistic] = useState<PendingStatistic>({} as PendingStatistic);
    const [rolesName, setRolesName] = useState<RoleName[]>([]);

    const rolesApi = useRolesApi();
    const statisticsApi = useStatisticsApi();

    const {addToast} = useToastContext();
    const {fetchRolesName} = useRoleQueries(rolesApi);
    const {fetchPendingStatisticDetails} = useStatisticsQueries(statisticsApi);

    const rolesNameData = fetchRolesName(true);
    const pendingStatisticData = fetchPendingStatisticDetails(onlyConfirmedOrder, selectedRoleIds.length > 0 ? selectedRoleIds : undefined);

    useEffect(() => {
        if (!rolesNameData) return;
        if (rolesNameData.error) return addToast(rolesNameData.code, "error");

        setRolesName(rolesNameData.roles!);
    }, [rolesNameData]);

    useEffect(() => {
        if (!pendingStatisticData) return;

        if (pendingStatisticData.error) return addToast(pendingStatisticData.code, "error");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {error, message, code, ...statisticOnly} = pendingStatisticData;

        setPendingStatistic(statisticOnly as PendingStatistic);
    }, [pendingStatisticData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <EditPendingStatisticFiltersForm selectedRoleIds={selectedRoleIds}
                                                     setSelectedRoleIds={setSelectedRoleIds}
                                                     onlyConfirmedOrder={onlyConfirmedOrder}
                                                     setOnlyConfirmedOrder={setOnlyConfirmedOrder}
                                                     rolesName={rolesName}/>
                    <PendingStatisticsTable pendingStatistic={pendingStatistic}/>
                </div>
            </div>
        </div>
    );
}