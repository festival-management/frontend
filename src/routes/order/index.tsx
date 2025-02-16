import {useEffect, useState} from "react";

import OrderInfo from "./OrderInfo.tsx";
import useMenusApi from "../../api/menus.ts";
import OrderDetails from "./OrderDetails.tsx";
import useOrdersApi from "../../api/orders.ts";
import {Menu} from "../../models/menus.model.ts";
import useProductsApi from "../../api/products.ts";
import OrderMenusTable from "./OrderMenusTable.tsx";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {Product} from "../../models/products.model.ts";
import OrderProductsTable from "./OrderProductsTable.tsx";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import useMenuQueries from "../../hooks/queries/use-menu-queries.ts";
import useProductQueries from "../../hooks/queries/use-product-queries.ts";
import useOrderMutations from "../../hooks/mutations/use-order-mutations.ts";

import "./style.css";

export default function RouteOrder() {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isSelectedProducts, setIsSelectedProducts] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);

    const productsApi = useProductsApi();
    const menusApi = useMenusApi();
    const ordersApi = useOrdersApi();

    const {addToast} = useToastContext();
    const {fetchAllMenusUser} = useMenuQueries(menusApi);
    const {fetchAllProductsUser} = useProductQueries(productsApi);
    const {
        orderCustomer,
        setOrderCustomer,
        orderGuests,
        setOrderGuests,
        orderIsTakeAway,
        setOrderIsTakeAway,
        orderTable,
        setOrderTable,
        orderProducts,
        setOrderProducts,
        orderMenus,
        setOrderMenus
    } = useOrderContext();

    const menusData = fetchAllMenusUser("name", true, true, true, true);
    const productsData = fetchAllProductsUser("name", true, true);

    const {addOrderMutation} = useOrderMutations(ordersApi);

    const handleSubmit = async () => {
        if (!orderCustomer) return addToast(ErrorCodes.MISSING_ORDER_CUSTOMER, "error");
        if (orderProducts.length === 0 && orderMenus.length === 0) return addToast(ErrorCodes.NO_PRODUCTS_AND_MENUS, "error");
        if (!orderIsTakeAway && !orderGuests) return addToast(ErrorCodes.SET_GUESTS_NUMBER, "error");

        const response = await addOrderMutation.mutateAsync({
            customer: orderCustomer,
            guests: orderIsTakeAway ? null : orderGuests,
            isTakeAway: orderIsTakeAway,
            table: orderIsTakeAway ? null : orderTable,
            products: orderProducts,
            menus: orderMenus
        });

        if (!response.error) {
            setOrderCustomer("");
            setOrderGuests(1);
            setOrderIsTakeAway(false);
            setOrderTable(1);

            setOrderProducts([]);
            setOrderMenus([]);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setNavbarHeight(document.getElementById('navbar')!.offsetHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!productsData) return;

        if (productsData.error) return addToast(productsData.code, "error");

        setProducts(productsData.products!);
    }, [productsData]);

    useEffect(() => {
        if (!menusData) return;

        if (menusData.error) return addToast(menusData.code, "error");

        setMenus(menusData.menus!);
    }, [menusData]);

    return (
        <div className="container-fluid p-4" style={{height: `calc(100vh - ${navbarHeight}px)`}}>
            <div className="row h-100">
                <div className="col-sm-8 d-flex h-100">
                    <div className="card w-100 h-100">
                        <div className="card-body d-flex flex-column h-100">
                            <OrderInfo/>
                            <div className="btn-group d-flex flex-wrap mb-3" role="group"
                                 aria-label="Select menu or product">
                                <button type="button"
                                        className={`btn btn-outline-primary ${isSelectedProducts ? 'active' : ''}`}
                                        onClick={() => setIsSelectedProducts(true)}>Products
                                </button>
                                <button type="button"
                                        className={`btn btn-outline-primary ${isSelectedProducts ? '' : 'active'}`}
                                        onClick={() => setIsSelectedProducts(false)}>Menus
                                </button>
                            </div>
                            {isSelectedProducts ?
                                <OrderProductsTable products={products}/> :
                                <OrderMenusTable menus={menus}/>}
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 d-flex h-100">
                    <div className="card w-100">
                        <div className="card-body d-flex flex-column h-100">
                            <h6 className="pb-2">Details</h6>
                            <div className="overflow-y-scroll mb-3 remove-scrollbar">
                                <OrderDetails products={products} menus={menus}/>
                            </div>
                            <button type="button" className="align-self-center btn btn-block btn-primary mt-auto"
                                    onClick={handleSubmit}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}