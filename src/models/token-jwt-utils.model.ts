import {Token} from "./token.model";

export interface TokenJwtUtils {
    isTokenExpired: () => boolean;
    isLoggedIn: () => boolean;
    canUserAdminister: () => boolean;
    canUserOrder: () => boolean;
    canUserStatistics: () => boolean;
    canUserPriorityStatistics: () => boolean;
    getToken: () => Token | null;
    getTokenString: () => string | null;
    reset: () => void;
    setTokenJwt: (token: string) => void;
}
