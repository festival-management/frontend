import {NavLink} from "react-router-dom";

import LinkModel from "../models/link.model";

export const LINKS = [
    new LinkModel(NavLink, "/login", "nav-link text-white", "Login", (t) => !t.isLoggedIn()),
    new LinkModel(NavLink, "/order", "nav-link text-white", "Order", (t) => t.canUserOrder()),
    new LinkModel(NavLink, "/order/confirm", "nav-link text-white", "Confirm Order", (t) => t.canUserConfirmOrder()),
    new LinkModel(NavLink, "/statistics", "nav-link text-white", "Statistics", (t) => t.canUserStatistics() || t.canUserPriorityStatistics()),
    new LinkModel(NavLink, "/roles", "nav-link text-white", "Roles", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/users", "nav-link text-white", "Users", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/subcategories", "nav-link text-white", "Subcategories", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/products", "nav-link text-white", "Products", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/menus", "nav-link text-white", "Menu", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/orders", "nav-link text-white", "Orders", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/printers", "nav-link text-white", "Printers", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/settings", "nav-link text-white", "Settings", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/profile", "nav-link text-white", "Profile", (t) => t.isLoggedIn()),
];
