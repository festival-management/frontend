import {useQuery} from "@tanstack/react-query";

import {GetSettingsResponse, UseSettingsApiInterface} from "../../models/settings.ts";

const UseSettingQueries = (settingsApi: UseSettingsApiInterface) => {
    const fetchSettingsData = (): GetSettingsResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["settings"],
            queryFn: () => settingsApi.getSettings(),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchSettingsData};
};

export default UseSettingQueries;
