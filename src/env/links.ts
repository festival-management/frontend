import {NavLink} from "react-router-dom";

import LinkModel from "../models/link.model";

export const LINKS = [
    new LinkModel(NavLink, "/login", "nav-link", "Login", (t) => !t.isLoggedIn()),
    new LinkModel(NavLink, "/order", "nav-link", "Order", (t) => t.canUserOrder()),
    new LinkModel(NavLink, "/roles", "nav-link", "Roles", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/users", "nav-link", "Users", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/subcategories", "nav-link", "Subcategories", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/products", "nav-link", "Products", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/menu", "nav-link", "Menu", (t) => t.canUserAdminister()),
    new LinkModel(NavLink, "/profile", "nav-link", "Profile", (t) => t.isLoggedIn()),
];
