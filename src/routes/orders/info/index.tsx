import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import useOrdersApi from "../../../api/orders.ts";
import {Order} from "../../../models/order.model.ts";
import OrderInfoMenusTable from "./OrderInfoMenusTable.tsx";
import OrderInfoProductsTable from "./OrderInfoProductsTable.tsx";
import {useToastContext} from "../../../contexts/ToastContext.tsx";
import useOrderQueries from "../../../hooks/queries/use-order-queries.ts";

export default function RouteOrderInfo() {
    const {id} = useParams();

    const [order, setOrder] = useState<Order>();

    const ordersApi = useOrdersApi();

    const {addToast} = useToastContext();
    const {fetchOrderDetails} = useOrderQueries(ordersApi);

    const data = fetchOrderDetails(
        parseInt(id || "-1"), true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true
    );

    useEffect(() => {
        if (!data) return;

        if (data.error) return addToast(data.code, "error");

        setOrder(data as Order);
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <p><b>Customer</b>: <span>{order?.customer}</span></p>
                    <p><b>Guests</b>: <span>{order?.guests}</span></p>
                    <p><b>Is Take Away</b>: <span>{order?.is_take_away ? "Yes" : "No"}</span></p>
                    <p><b>Table</b>: <span>{order?.table}</span></p>
                    <p><b>Is Confirmer</b>: <span>{order?.is_confirm ? "Yes" : "No"}</span></p>
                    <p><b>Is done</b>: <span>{order?.is_done ? "Yes" : "No"}</span></p>
                    <p><b>Is voucher</b>: <span>{order?.is_voucher ? "Yes" : "No"}</span></p>
                    <p><b>Price</b>: <span>{order?.price}</span></p>
                    <p><b>User</b>: <span>{order?.user?.username}</span></p>
                    <p><b>Confirmer by</b>: <span>{order?.confirmed_by?.username}</span></p>
                    <p><b>Created At</b>: <span>
                        {
                            order?.created_at && new Date(order.created_at).toLocaleString('it-IT', {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                            })
                        }
                    </span></p>
                    <hr/>
                    <p><b>Products</b>:</p>
                    <OrderInfoProductsTable orderProducts={order?.products}/>
                    <hr/>
                    <p><b>Menus</b>:</p>
                    <OrderInfoMenusTable orderMenus={order?.menus}/>
                </div>
            </div>
        </div>
    );
}