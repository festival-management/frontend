import {Token} from "./token.model";

export interface TokenJwtUtils {
    isTokenExpired: () => boolean;
    isLoggedIn: () => boolean;
    canUserAdminister: () => boolean;
    canUserOrder: () => boolean;
    getToken: () => Token | null;
}
