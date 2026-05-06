import {useMemo} from "react";
import {InvalidTokenError, jwtDecode} from "jwt-decode";

import {Token} from "../models/token.model";
import useTokenJwt from "../store/token-jwt";
import {Permission} from "../enums/permission.ts";
import {TokenJwtUtils} from "../models/token-jwt-utils.model";

const useTokenJwtUtils = () => {
    const {tokenJwt, reset, setTokenJwt} = useTokenJwt();

    const decodedToken = useMemo(() => {
        try {
            return jwtDecode(tokenJwt) as Token;
        } catch (error) {
            if (error instanceof InvalidTokenError) {
                return null;
            }
            return null;
        }
    }, [tokenJwt]);

    const isTokenExpired = () => {
        if (!decodedToken) return true;

        return new Date(decodedToken.exp * 1000) < new Date();
    };

    const isLoggedIn = () => !!decodedToken && !isTokenExpired();

    const hasPermission = (permission: Permission) => {
        if (!decodedToken) return false;
        return isLoggedIn() && decodedToken.permissions[permission];
    };

    const getToken = () => (isLoggedIn() ? decodedToken : null);
    const getTokenString = () => (isLoggedIn() ? tokenJwt : null);

    return {
        isTokenExpired,
        isLoggedIn,
        canUserAdminister: () => hasPermission(Permission.CAN_ADMINISTER),
        canUserOrder: () => hasPermission(Permission.CAN_ORDER),
        canUserConfirmOrder: () => hasPermission(Permission.CAN_CONFIRM_ORDERS),
        canUserStatistics: () => hasPermission(Permission.CAN_STATISTICS),
        canUserPriorityStatistics: () => hasPermission(Permission.CAN_PRIORITY_STATISTICS),
        canUserServeOrder: () => hasPermission(Permission.CAN_SERVE_ORDERS),
        canUserModifyCompletedOrders: () => hasPermission(Permission.CAN_MODIFY_COMPLETED_ORDERS),
        getToken,
        getTokenString,
        reset,
        setTokenJwt
    } as TokenJwtUtils;
};

export default useTokenJwtUtils;
