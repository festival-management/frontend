import {useEffect, useState} from "react";

import OrdersTable from "./OrdersTable.tsx";
import useOrdersApi from "../../api/orders.ts";
import {Order} from "../../models/order.model.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useOrderQueries from "../../hooks/queries/use-order-queries.ts";
import PaginationControls from "../../components/pagination-controls.tsx";

export default function RouteOrders() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [orders, setOrders] = useState<Order[]>([]);

    const ordersApi = useOrdersApi();

    const {addToast} = useToastContext();
    const {fetchMenusData} = useOrderQueries(ordersApi);

    const data = fetchMenusData(
        page, "id", true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true
    );

    useEffect(() => {
        if (!data) return;

        if (data.error) return addToast(data.code, "error");

        setOrders(data.orders!);
        setTotalCount(data.total_count!);
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <OrdersTable ordersApi={ordersApi} orders={orders} setOrders={setOrders}
                                 setTotalCount={setTotalCount}/>
                    <PaginationControls page={page} setPage={setPage} totalCount={totalCount}/>
                </div>
            </div>
        </div>
    );
}