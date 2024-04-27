import React from "react";
import {createBrowserRouter} from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";
import RouteRoles from "./routes/roles";
import RouteUsers from "./routes/users";
import RouteProfile from "./routes/profile";
import RouteRoleEdit from "./routes/roles/edit";
import RouteUserEdit from "./routes/users/edit";

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
                },
                {
                    path: "/profile",
                    element: <RouteProfile/>
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
