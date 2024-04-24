import React from "react";
import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";
import RouteRoles from "./routes/roles";
import RouteRoleEdit from "./routes/roles/edit";

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
                    path: "/roles",
                    element: <RouteRoles/>
                },
                {
                    path: "/roles/edit/:id",
                    element: <RouteRoleEdit/>
                }
            ]
        }
    ]
);

export default routers;
