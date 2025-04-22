import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";
import RouteMenus from "./routes/menus";
import RouteLogin from "./routes/login";
import RouteRoles from "./routes/roles";
import RouteUsers from "./routes/users";
import RouteOrder from "./routes/order";
import RouteOrders from "./routes/orders";
import RouteProfile from "./routes/profile";
import RoutePrinters from "./routes/printers";
import RouteSettings from "./routes/settings";
import RouteProducts from "./routes/products";
import RouteMenuEdit from "./routes/menus/edit";
import RouteRoleEdit from "./routes/roles/edit";
import RouteUserEdit from "./routes/users/edit";
import RouteOrderInfo from "./routes/orders/info";
import RouteProductEdit from "./routes/products/edit";
import RouteSubcategories from "./routes/subcategories";
import {ToastProvider} from "./contexts/ToastContext.tsx";
import {OrderProvider} from "./contexts/OrderContext.tsx";
import RouteSubcategoryEdit from "./routes/subcategories/edit";
import {MenuEditProvider} from "./contexts/MenuEditContext.tsx";
import {ProductEditProvider} from "./contexts/ProductEditContext.tsx";

const routers = createBrowserRouter(
    [
        {
            path: "/",
            element: <ToastProvider><RouteHome/></ToastProvider>,
            children: [
                {
                    path: "/login",
                    element: <RouteLogin/>
                },
                {
                    path: "/menus",
                    element: <RouteMenus/>
                },
                {
                    path: "/menus/edit/:id",
                    element: <MenuEditProvider><RouteMenuEdit/></MenuEditProvider>
                },
                {
                    path: "/order",
                    element: <OrderProvider><RouteOrder/></OrderProvider>
                },
                {
                    path: "/orders",
                    element: <RouteOrders/>
                },
                {
                    path: "/orders/info/:id",
                    element: <RouteOrderInfo/>
                },
                {
                    path: "/printers",
                    element: <RoutePrinters/>
                },
                {
                    path: "/products",
                    element: <RouteProducts/>
                },
                {
                    path: "/products/edit/:id",
                    element: <ProductEditProvider><RouteProductEdit/></ProductEditProvider>
                },
                {
                    path: "/profile",
                    element: <RouteProfile/>
                },
                {
                    path: "/roles",
                    element: <RouteRoles/>
                },
                {
                    path: "/roles/edit/:id",
                    element: <RouteRoleEdit/>
                },
                {
                    path: "/settings",
                    element: <RouteSettings/>
                },
                {
                    path: "/subcategories",
                    element: <RouteSubcategories/>
                },
                {
                    path: "/subcategories/edit/:id",
                    element: <RouteSubcategoryEdit/>
                },
                {
                    path: "/users",
                    element: <RouteUsers/>
                },
                {
                    path: "/users/edit/:id",
                    element: <RouteUserEdit/>
                }
            ]
        }
    ]
);

export default routers;
