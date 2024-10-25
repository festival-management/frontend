import {Outlet} from "react-router-dom";

import NavBar from "../../components/navbar";

export default function RouteHome() {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    );
}