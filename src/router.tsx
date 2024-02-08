import React from "react";
import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";

const routers = createBrowserRouter(
    [
        {
            path: "/",
            element: <RouteHome/>,
            children: [
                {
                    path: "/login",
                    element: <RouteLogin/>
                }
            ]
        }
    ]
);

export default routers;
