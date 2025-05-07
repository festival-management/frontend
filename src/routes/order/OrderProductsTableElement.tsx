import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {Product} from "../../models/products.model.ts";
import {CreateOrderProduct} from "../../models/order.model.ts";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import ProductSelection from "../../components/product-selection.tsx";

type OrderProductsTableElementProps = {
    product: Product;
}

export default function OrderProductsTableElement({product}: OrderProductsTableElementProps) {
    const {addToast} = useToastContext();
    const {addProduct, setOrderTotalPrice} = useOrderContext();

    const handleSubmit = async (orderProduct: CreateOrderProduct) => {
        if (!orderProduct.quantity) return addToast(ErrorCodes.PRODUCT_QUANTITY_CANNOT_BE_ZERO, "error");

        if (product.variants?.length && !orderProduct.variant_id) return addToast(ErrorCodes.INPUT_PRODUCT_VARIANT, "error");

        addProduct(orderProduct);

        setOrderTotalPrice((prevState) => prevState + orderProduct.price);
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <ProductSelection product={product} isFromMenu={false} updateProductInState={handleSubmit}/>
            </div>
        </div>
    );
}