const API = {
    BASE_URL: new URL(import.meta.env.VITE_BASE_URL as string),
    get AUTH() {
        return new URL("/auth", this.BASE_URL);
    },
    get MENUS() {
        return new URL("/menu", this.BASE_URL);
    },
    get PRODUCTS() {
        return new URL("/products", this.BASE_URL);
    },
    get ROLES() {
        return new URL("/roles", this.BASE_URL);
    },
    get SUBCATEGORIES() {
        return new URL("/subcategories", this.BASE_URL);
    },
    get USERS() {
        return new URL("/users", this.BASE_URL);
    },
};

export default API;
