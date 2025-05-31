import React from "react";

import {Statistic} from "../../models/statistics.model.ts";

interface StatisticsTableProps {
    statistic: Statistic
}

export default function StatisticsTable({statistic}: StatisticsTableProps) {
    const tableBody: React.JSX.Element[] = statistic.products?.map((v, index) => (
        <tr key={index}>
            <td>{v.name}</td>
            <td>{v.quantity}</td>
            <td>{v.price} €</td>
            <td>{v.total_price} €</td>
        </tr>
    ));

    return (
        <>
            <h6>Statistics</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Total orders</span>
                <span className="form-control">{statistic.total_orders}</span>
                <span className="input-group-text">Total seated</span>
                <span className="form-control">{statistic.total_seated}</span>
                <span className="input-group-text">Total take away</span>
                <span className="form-control">{statistic.total_take_away}</span>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total Price</th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </table>
            <div className="input-group mb-3">
                <span className="input-group-text">Total price with cover</span>
                <span className="form-control">{statistic.total_price_with_cover}</span>
                <span className="input-group-text">Total price without cover</span>
                <span className="form-control">{statistic.total_price_without_cover}</span>
            </div>
        </>
    );
}