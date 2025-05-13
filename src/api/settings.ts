import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {GetSettingsResponse, Settings, UseSettingsApiInterface} from "../models/settings.ts";

const useSettingsApi = (): UseSettingsApiInterface => {
    const {http} = useHttpClient(API.SETTINGS.href);

    const getSettings = async () => {
        const response: AxiosResponse<GetSettingsResponse> = await http.get(
            "/",
        );

        return response.data;
    };

    const updateSettings = async (settings: Settings) => {
        const response: AxiosResponse<BaseResponse> = await http.put(
            "/",
            settings
        );

        return response.data;
    };

    return {getSettings, updateSettings};
};

export default useSettingsApi;