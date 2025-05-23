import {NavLink} from "react-router-dom";

import LinkModel from "../models/link.model";

export const LINKS = [
    new LinkModel(NavLink, "/login", "nav-link", "Login", (t) => !t.isLoggedIn()),
    new LinkModel(NavLink, "/order", "nav-link", "Order", (t) => t.canUserOrder()),
    new LinkModel(NavLink, "/order/confirm", "nav-link", "Confirm Order", (t) => t.canUserConfirmOrder()),
    new LinkModel(NavLink, "/statistics", "nav-link", "Statistics", (t) => t.canUserStatistics() || t.canUserPriorityStatistics()),
    new LinkModel(NavLink, "/roles", "nav-link", "Roles", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/users", "nav-link", "Users", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/subcategories", "nav-link", "Subcategories", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/products", "nav-link", "Products", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/menus", "nav-link", "Menu", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/orders", "nav-link", "Orders", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/printers", "nav-link", "Printers", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/settings", "nav-link", "Settings", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/profile", "nav-link", "Profile", (t) => t.isLoggedIn()),
];
