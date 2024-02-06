import React from "react";
import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";

const routers = createBrowserRouter(
    [
        {
            path: "/",
            element: <RouteHome/>,
            children: []
        }
    ]
);

export default routers;
