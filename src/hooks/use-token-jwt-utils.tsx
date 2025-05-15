import {InvalidTokenError, jwtDecode} from "jwt-decode";

import useTokenJwt from "../store/token-jwt";
import {Token} from "../models/token.model";
import {TokenJwtUtils} from "../models/token-jwt-utils.model";

const useTokenJwtUtils = () => {
    const {tokenJwt, reset, setTokenJwt} = useTokenJwt();

    const isTokenExpired = () => {
        const decodedToken = getDecodedToken();

        if (!decodedToken) return true;

        return new Date(decodedToken.exp * 1000) < new Date();
    }
    const isLoggedIn = () => !isTokenExpired();
    const canUserAdminister = () => {
        const decodedToken = getDecodedToken();

        if (!decodedToken) return false;

        return isLoggedIn() && decodedToken.permissions["can_administer"];
    }
    const canUserOrder = () => {
        const decodedToken = getDecodedToken();

        if (!decodedToken) return false;

        return isLoggedIn() && decodedToken.permissions["can_order"];
    };
    const canUserConfirmOrder = () => {
        const decodedToken = getDecodedToken();

        if (!decodedToken) return false;

        return isLoggedIn() && decodedToken.permissions["can_confirm_orders"];
    }
    const canUserStatistics = () => {
        const decodedToken = getDecodedToken();

        if (!decodedToken) return false;

        return isLoggedIn() && decodedToken.permissions["can_statistics"];
    };
    const canUserPriorityStatistics = () => {
        const decodedToken = getDecodedToken();

        if (!decodedToken) return false;

        return isLoggedIn() && decodedToken.permissions["can_priority_statistics"];
    };
    const getToken = () => {
        const decodedToken = getDecodedToken();
        return isLoggedIn() ? decodedToken : null;
    }
    const getTokenString = () => isLoggedIn() ? tokenJwt : null;

    const getDecodedToken = () => {
        try {
            return jwtDecode(tokenJwt) as Token;
        } catch (error) {
            if (error instanceof InvalidTokenError) {
                return null;
            }
        }
    }

    return {
        isTokenExpired,
        isLoggedIn,
        canUserAdminister,
        canUserOrder,
        canUserConfirmOrder,
        canUserStatistics,
        canUserPriorityStatistics,
        getToken,
        getTokenString,
        reset,
        setTokenJwt
    } as TokenJwtUtils;
};

export default useTokenJwtUtils;
