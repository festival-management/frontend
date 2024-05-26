import React from "react";
import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";
import RouteRoles from "./routes/roles";
import RouteUsers from "./routes/users";
import RouteProfile from "./routes/profile";
import RouteProducts from "./routes/products";
import RouteRoleEdit from "./routes/roles/edit";
import RouteUserEdit from "./routes/users/edit";
import RouteProductEdit from "./routes/products/edit";
import RouteSubcategories from "./routes/subcategories";
import RouteSubcategoryEdit from "./routes/subcategories/edit";

const routers = createBrowserRouter(
    [
        {
            path: "/",
            element: <RouteHome/>,
            children: [
                {
                    path: "/login",
                    element: <RouteLogin/>
                },
                {
                    path: "/products",
                    element: <RouteProducts/>
                },
                {
                    path: "/products/edit/:id",
                    element: <RouteProductEdit/>
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
