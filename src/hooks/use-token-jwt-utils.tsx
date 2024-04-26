import {jwtDecode} from "jwt-decode";

import useTokenJwt from "../store/token-jwt";
import {Token} from "../models/token.model";
import {TokenJwtUtils} from "../models/token-jwt-utils.model";

const useTokenJwtUtils = () => {
    const {tokenJwt, reset, setTokenJwt} = useTokenJwt();

    const isTokenExpired = () => {
        if (tokenJwt === '')
            return true;

        return new Date((jwtDecode(tokenJwt) as Token).exp * 1000) < new Date();
    }
    const isLoggedIn = () => !isTokenExpired();
    const canUserAdminister = () => isLoggedIn() && (jwtDecode(tokenJwt) as Token).permissions["can_administer"];
    const canUserOrder = () => isLoggedIn() && (jwtDecode(tokenJwt) as Token).permissions["can_order"];
    const getToken = () => isLoggedIn() ? (jwtDecode(tokenJwt) as Token) : null;
    const getTokenString = () => isLoggedIn() ? tokenJwt : null;

    return {
        isTokenExpired,
        isLoggedIn,
        canUserAdminister,
        canUserOrder,
        getToken,
        getTokenString,
        reset,
        setTokenJwt
    } as TokenJwtUtils;
};

export default useTokenJwtUtils;
