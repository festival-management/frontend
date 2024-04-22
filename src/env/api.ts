
const API = {
    BASE_URL: new URL(process.env.REACT_APP_BASE_URL as string),
    get AUTH() {
        return new URL("/auth", this.BASE_URL);
    },
    get ROLES() {
        return new URL("/roles", this.BASE_URL);
    },
};

export default API;
