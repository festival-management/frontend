const API = {
    BASE_URL: new URL(import.meta.env.VITE_BASE_URL as string),
    get AUTH() {
        return new URL("/auth", this.BASE_URL);
    },
    get MENUS() {
        return new URL("/menus", this.BASE_URL);
    },
    get ORDERS() {
        return new URL("/orders", this.BASE_URL);
    },
    get PRINTERS() {
        return new URL("/printers", this.BASE_URL);
    },
    get PRODUCTS() {
        return new URL("/products", this.BASE_URL);
    },
    get ROLES() {
        return new URL("/roles", this.BASE_URL);
    },
    get SETTINGS() {
        return new URL("/settings", this.BASE_URL);
    },
    get SUBCATEGORIES() {
        return new URL("/subcategories", this.BASE_URL);
    },
    get USERS() {
        return new URL("/users", this.BASE_URL);
    },
};

export default API;
