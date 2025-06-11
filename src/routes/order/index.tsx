import {useEffect, useMemo, useState} from "react";

import OrderInfo from "./OrderInfo.tsx";
import useMenusApi from "../../api/menus.ts";
import OrderDetails from "./OrderDetails.tsx";
import useOrdersApi from "../../api/orders.ts";
import {Menu} from "../../models/menus.model.ts";
import useProductsApi from "../../api/products.ts";
import useSettingsApi from "../../api/settings.ts";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {SettingsUser} from "../../models/settings.ts";
import {Product} from "../../models/products.model.ts";
import OrderProductsTable from "./OrderProductsTable.tsx";
import useSubcategoriesApi from "../../api/subcategories.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import {SubcategoryName} from "../../models/subcategories.model.ts";
import useMenuQueries from "../../hooks/queries/use-menu-queries.ts";
import useProductQueries from "../../hooks/queries/use-product-queries.ts";
import useSettingQueries from "../../hooks/queries/use-setting-queries.ts";
import useOrderMutations from "../../hooks/mutations/use-order-mutations.ts";
import useSubcategoryQueries from "../../hooks/queries/use-subcategory-queries.ts";

import "./style.css";

export default function RouteOrder() {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [subcategories, setSubcategories] = useState<SubcategoryName[]>([]);
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);
    const [settings, setSettings] = useState<SettingsUser>({} as SettingsUser);
    const [lastOrder, setLastOrder] = useState<number>(0);
    const [resetSubcategoryTrigger, setResetSubcategoryTrigger] = useState(0);

    const productsApi = useProductsApi();
    const menusApi = useMenusApi();
    const ordersApi = useOrdersApi();
    const subcategoriesApi = useSubcategoriesApi();
    const settingsApi = useSettingsApi();

    const {addToast} = useToastContext();
    const {fetchAllMenusUser} = useMenuQueries(menusApi);
    const {fetchAllProductsUser} = useProductQueries(productsApi);
    const {fetchSubcategoriesName} = useSubcategoryQueries(subcategoriesApi);
    const {fetchSettingsData} = useSettingQueries(settingsApi);
    const {
        orderCustomer,
        setOrderCustomer,
        orderGuests,
        setOrderGuests,
        orderIsTakeAway,
        setOrderIsTakeAway,
        orderTable,
        setOrderTable,
        orderIsVoucher,
        setOrderIsVoucher,
        orderParentOrder,
        setOrderParentOrder,
        orderProducts,
        setOrderProducts,
        orderMenus,
        setOrderMenus,
    } = useOrderContext();

    const menusData = fetchAllMenusUser("name", true, true, true, true);
    const productsData = fetchAllProductsUser("order", true, true);
    const subcategoriesNameData = fetchSubcategoriesName("order");
    const settingsData = fetchSettingsData();

    const {addOrderMutation} = useOrderMutations(ordersApi);

    const handleSubmit = async () => {
        if (!orderCustomer) return addToast(ErrorCodes.MISSING_ORDER_CUSTOMER, "error");
        if (orderProducts.length === 0 && orderMenus.length === 0) return addToast(ErrorCodes.NO_PRODUCTS_AND_MENUS, "error");
        if (!orderIsTakeAway && !orderGuests) return addToast(ErrorCodes.SET_GUESTS_NUMBER, "error");

        const response = await addOrderMutation.mutateAsync({
            customer: orderCustomer,
            guests: orderIsTakeAway || orderParentOrder ? null : orderGuests,
            isTakeAway: orderIsTakeAway,
            table: orderIsTakeAway || orderParentOrder ? null : orderTable,
            isVoucher: orderIsVoucher,
            parentOrder: orderParentOrder,
            products: orderProducts,
            menus: orderMenus
        });

        if (!response.error) {
            setLastOrder(response.order.id);

            setOrderCustomer("");
            setOrderGuests(1);
            setOrderIsTakeAway(false);
            setOrderTable(1);
            setOrderIsVoucher(false);
            setOrderParentOrder(null);
            setOrderTotalPrice(0);
            setResetSubcategoryTrigger((prevState) => prevState + 1);

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

    useEffect(() => {
        if (!subcategoriesNameData) return;

        if (subcategoriesNameData.error) return addToast(subcategoriesNameData.code, "error");

        setSubcategories(subcategoriesNameData.subcategories!);
    }, [subcategoriesNameData]);

    useEffect(() => {
        if (!settingsData) return;

        if (settingsData.error) return addToast(settingsData.code, "error");

        setSettings(settingsData.settings! as SettingsUser);
    }, [settingsData]);

    const shouldApplyCoverCharge = useMemo(() => {
        if (orderIsTakeAway) return false;

        const hasCoverChargeProduct = orderProducts.some(orderProduct => {
            const product = products.find(p => p.id === orderProduct.product_id);
            const subcategory = subcategories.find(s => s.id === product?.subcategory_id);
            return subcategory?.include_cover_charge === true;
        });

        const hasMenuProductWithCoverCharge = orderMenus.some(orderMenu => {
            const fullMenu = menus.find(m => m.id === orderMenu.menu_id);
            if (!fullMenu?.fields) return false;

            return orderMenu.fields.some(orderedField => {
                const fullField = fullMenu.fields!.find(f => f.id === orderedField.menu_field_id);
                if (!fullField?.products) return false;

                return orderedField.products.some(orderedProduct => {
                    const menuFieldProduct = fullField.products!.find(p => p.product.id === orderedProduct.product_id);
                    const product = menuFieldProduct?.product;
                    if (!product) return false;

                    const subcategory = subcategories.find(s => s.id === product.subcategory_id);
                    return subcategory?.include_cover_charge === true;
                });
            });
        });

        return hasCoverChargeProduct || hasMenuProductWithCoverCharge;
    }, [orderIsTakeAway, orderProducts, orderMenus, products, menus, subcategories]);

    useEffect(() => {
        const productsTotal = orderProducts.reduce((acc, p) => acc + p.price, 0);
        const menusTotal = orderMenus.reduce((acc, m) => acc + m.price, 0);

        const coverCharge = !orderIsTakeAway && shouldApplyCoverCharge
            ? orderGuests * settings.cover_charge
            : 0;

        setOrderTotalPrice(productsTotal + menusTotal + coverCharge);
    }, [orderProducts, orderMenus, settings, shouldApplyCoverCharge, orderGuests]);

    return (
        <div className="container-fluid p-4" style={{height: `calc(100vh - ${navbarHeight}px)`}}>
            <div className="row h-100">
                <div className="col-sm-8 d-flex h-100">
                    <div className="card w-100 h-100">
                        <div className="card-body d-flex flex-column h-100">
                            <OrderInfo settings={settings}/>
                            <OrderProductsTable subcategoriesName={subcategories} products={products} menus={menus} resetSubcategoryTrigger={resetSubcategoryTrigger}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 d-flex h-100">
                    <div className="card w-100">
                        <div className="card-body d-flex flex-column h-100">
                            <h6 className="pb-2">Details</h6>
                            <div className="overflow-y-scroll mb-3 remove-scrollbar">
                                <OrderDetails products={products} menus={menus} coverCharge={settings.cover_charge} showCoverCharge={shouldApplyCoverCharge}/>
                            </div>
                            <div className="mt-auto d-flex flex-column">
                                <h5 className="align-self-center">LAST ORDER: {lastOrder}</h5>
                                <h5 className="align-self-center">TOTAL: {orderIsVoucher ? 0.00.toFixed(2) : orderTotalPrice.toFixed(2)} €</h5>
                                <button type="button" className="align-self-center btn btn-block btn-primary"
                                        onClick={handleSubmit}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}