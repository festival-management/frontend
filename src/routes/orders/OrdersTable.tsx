import React from "react";
import {Link} from "react-router-dom";

import {Order, UseOrdersApiInterface} from "../../models/order.model.ts";
import useOrderMutations from "../../hooks/mutations/use-order-mutations.ts";
import OrderPrint from "./OrderPrint.tsx";

interface OrdersTableProps {
    ordersApi: UseOrdersApiInterface;
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrdersTable({ordersApi, orders, setOrders, setTotalCount}: OrdersTableProps) {
    const {deleteOrderMutation} = useOrderMutations(ordersApi);

    const handleDeleteOrder = async (id: number) => {
        const response = await deleteOrderMutation.mutateAsync(id);

        if (!response.error) {
            setOrders((prevState) => prevState.filter((order) => order.id !== id));
            setTotalCount((prevState) => prevState - 1);
        }
    };

    const tableBody: React.JSX.Element[] = orders.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.customer}</td>
            <td>{v.guests}</td>
            <td>{v.is_take_away ? "Yes" : "No"}</td>
            <td>{v.table}</td>
            <td>{v.user?.username}</td>
            <td>
                <Link className="btn btn-primary" to={`/orders/info/${v.id}`} role="button">
                    <i className="bi bi-info-circle"/>
                </Link>
                <OrderPrint ordersApi={ordersApi} orderId={v.id}/>
                <button
                    type="button"
                    className="btn btn-danger invisible"
                    onClick={() => handleDeleteOrder(v.id)}
                >
                    <i className="bi bi-trash"/>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h6>Orders</h6>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Is Take Away</th>
                    <th scope="col">Table</th>
                    <th scope="col">User</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </table>
        </>
    );
}