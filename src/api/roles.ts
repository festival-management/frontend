import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import {GetRolesResponse} from "../models/roles.model";

const useRolesApi = () => {
    const {http} = useHttpClient(API.ROLES.toString());

    const getRoles = async (page: number) => {
        const limit = process.env.REACT_APP_DEFAULT_LIMIT_VALUE;
        const response: AxiosResponse<GetRolesResponse> = await http.get(
            "/",
            {params: {offset: limit * (page - 1), limit: limit}}
        );

        return response.data;
    };

    return {getRoles};
};

export default useRolesApi;
