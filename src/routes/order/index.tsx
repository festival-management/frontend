import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import OrderInfo from "./OrderInfo.tsx";
import useMenusApi from "../../api/menus.ts";
import OrderDetails from "./OrderDetails.tsx";
import {Menu} from "../../models/menus.model.ts";
import useProductsApi from "../../api/products.ts";
import OrderMenusTable from "./OrderMenusTable.tsx";
import {Product} from "../../models/products.model.ts";
import OrderProductsTable from "./OrderProductsTable.tsx";
import useSubcategoriesApi from "../../api/subcategories.ts";
import ToastManager from "../../components/toast-manager.tsx";
import {SubcategoryName} from "../../models/subcategories.model.ts";
import {OrderMenu, OrderProduct} from "../../models/order.model.ts";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";

import "./style.css";

export default function RouteOrder() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isSelectedProducts, setIsSelectedProducts] = useState(true);
    const [subcategoriesName, setSubcategoriesName] = useState<SubcategoryName[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [orderCustomer, setOrderCustomer] = useState("");
    const [orderGuests, setOrderGuests] = useState(1);
    const [orderIsTakeAway, setOrderIsTakeAway] = useState(false);
    const [orderTable, setOrderTable] = useState(1);
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
    const [orderMenus, setOrderMenus] = useState<OrderMenu[]>([]);

    const subcategoriesApi = useSubcategoriesApi();
    const productsApi = useProductsApi();
    const menusApi = useMenusApi();

    const addToast = (message: string, type: ToastType) => {
        setToasts((prevToasts) => [{ message, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const dataSubcategoriesName = await subcategoriesApi.getSubcategoriesName("order");
            const dataProducts = await productsApi.getAllProductsUser("name", true, true);
            const dataMenus = await menusApi.getAllMenusUser("name", true);

            return {subcategoriesName: dataSubcategoriesName, products: dataProducts, menus: dataMenus};
        },
        enabled: true,
        staleTime: 0,
    });

    const handleOrderCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderCustomer(event.target.value);
    };

    const handleOrderGuestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderGuests(parseInt(event.target.value));
    };

    const handleOrderIsTakeAwayChange = () => {
        setOrderIsTakeAway((prevState) => !prevState);
    };

    const handleOrderTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderTable(parseInt(event.target.value));
    };

    const handleSubmitAddProduct = async (product: OrderProduct) => {
        setOrderProducts((prevState) => [...prevState, product]);
    };

    const handleSubmitAddMenu = async (menu: OrderMenu) => {
        setOrderMenus((prevState) => [...prevState, menu]);
    };

    const handleSubmitRemoveProduct = async (index: number) => {
        const updatedProducts = orderProducts.filter((_, i) => i !== index);
        setOrderProducts(updatedProducts);
    };

    const handleSubmitRemoveMenu = async (index: number) => {
        const updatedMenus = orderMenus.filter((_, i) => i !== index);
        setOrderMenus(updatedMenus);
    };

    useEffect(() => {
        const handleResize = () => {
            setNavbarHeight(document.getElementById('navbar').offsetHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        if (data) {
            if (data.subcategoriesName.error) {
                return addToast(data.subcategoriesName.message, "error");
            }

            setSubcategoriesName(data.subcategoriesName.subcategories!);

            if (data.products.error) {
                return addToast(data.products.message, "error");
            }

            setProducts(data.products.products!);

            if (data.menus.error) {
                return addToast(data.menus.message, "error");
            }

            setMenus(data.menus.menus!);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    return (
        <div className="container-fluid p-4" style={{height: `calc(100vh - ${navbarHeight}px)`}}>
            <div className="row h-100">
                <div className="col-sm-8 d-flex h-100">
                    <div className="card w-100 h-100">
                        <div className="card-body d-flex flex-column h-100">
                            <OrderInfo customer={orderCustomer} guests={orderGuests} isTakeAway={orderIsTakeAway}
                                       table={orderTable}
                                       handleCustomerChange={handleOrderCustomerChange}
                                       handleGuestsChange={handleOrderGuestsChange}
                                       handleIsTakeAwayChange={handleOrderIsTakeAwayChange}
                                       handleTableChange={handleOrderTableChange}/>
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
                                <OrderProductsTable subcategoriesName={subcategoriesName} products={products} addToast={addToast}
                                                    handleSubmitAddProduct={handleSubmitAddProduct}/> :
                                <OrderMenusTable menus={menus} products={products} addToast={addToast} handleSubmitAddMenu={handleSubmitAddMenu}/>}
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 d-flex h-100">
                    <div className="card w-100">
                        <div className="card-body d-flex flex-column h-100">
                            <h6 className="pb-2">Details</h6>
                            <div className="overflow-y-scroll mb-3 remove-scrollbar">
                                <OrderDetails orderProducts={orderProducts} orderMenus={orderMenus} products={products}
                                              menus={menus} handleSubmitRemoveProduct={handleSubmitRemoveProduct}
                                              handleSubmitRemoveMenu={handleSubmitRemoveMenu}/>
                            </div>
                            <button type="button" className="align-self-center btn btn-block btn-primary mt-auto">Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    )
}