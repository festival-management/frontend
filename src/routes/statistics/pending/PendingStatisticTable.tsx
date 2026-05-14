import React from "react";

import {PendingStatistic} from "../../../models/statistics.model.ts";

interface PendingStatisticsTableProps {
    pendingStatistic: PendingStatistic
}

export default function PendingStatisticsTable({pendingStatistic}: PendingStatisticsTableProps) {
    const tableBody: React.JSX.Element[] = pendingStatistic.products?.map((v, index) => (
        <tr key={index}>
            <td>{v.name}</td>
            <td>{v.pending_quantity}</td>
        </tr>
    ));

    return (
        <>
            <h6>Pending Statistics</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Total orders</span>
                <span className="form-control">{pendingStatistic.total_orders}</span>
                <span className="input-group-text">Total seated</span>
                <span className="form-control">{pendingStatistic.total_seated}</span>
                <span className="input-group-text">Total take away</span>
                <span className="form-control">{pendingStatistic.total_take_away}</span>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Pending Quantity</th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </table>
        </>
    );
}