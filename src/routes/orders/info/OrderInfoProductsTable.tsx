import {OrderProduct} from "../../../models/order.model.ts";

type OrderInfoProductsTableProps = {
    orderProducts: OrderProduct[] | undefined;
}

export default function OrderInfoProductsTable({orderProducts}: OrderInfoProductsTableProps) {
    const tableBodyProducts = orderProducts?.map((orderProduct) => (
        <tr key={orderProduct.id}>
            <th scope="row">{orderProduct.id}</th>
            <td>{orderProduct.product?.name}</td>
            <td>{orderProduct.price}</td>
            <td>{orderProduct.quantity}</td>
            <td>
                {orderProduct.product?.variants?.find((v) => v.id === orderProduct.variant_id)?.name || "N/A"}
            </td>
            <td>
                {orderProduct.ingredients?.map((ingredient) => {
                    const ingredientDetails = orderProduct.product?.ingredients?.find(
                        (ing) => ing.id === ingredient.product_ingredient_id
                    );
                    return ingredientDetails ? `${ingredientDetails.name}` : "";
                }).join(", ") || "N/A"}
            </td>
        </tr>
    ));

    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Variant</th>
                <th scope="col">Ingredients</th>
            </tr>
            </thead>
            <tbody>
            {tableBodyProducts}
            </tbody>
        </table>
    );
}