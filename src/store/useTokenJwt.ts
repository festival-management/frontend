import {create} from 'zustand';

export interface TokenJwt {
    tokenJwt: string
    setTokenJwt: (token: string) => void
    reset: () => void
}

const useTokenJwt = create<TokenJwt>()((set) => ({
    tokenJwt: localStorage.getItem("festival-token") || "",
    setTokenJwt: (token) => set(function (_) {
        localStorage.setItem("festival-token", token);
        return ({tokenJwt: token});
    }),
    reset: () => set(function (_) {
        localStorage.setItem("festival-token", "");
        return ({tokenJwt: ""});
    })
}));

export default useTokenJwt;
