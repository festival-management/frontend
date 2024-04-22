import React from "react";
import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";
import RouteRoles from "./routes/roles";

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
                }
            ]
        }
    ]
);

export default routers;
