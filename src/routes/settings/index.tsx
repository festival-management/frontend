import {useEffect, useState} from "react";

import SettingsTable from "./SettingsTable.tsx";
import {Settings} from "../../models/settings.ts";
import useSettingsApi from "../../api/settings.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import useSettingQueries from "../../hooks/queries/use-setting-queries.ts";
import useSettingMutations from "../../hooks/mutations/use-setting-mutations.ts";

export default function RouteSettings() {
    const [settings, setSettings] = useState<Settings>({} as Settings);

    const settingsApi = useSettingsApi();

    const {addToast} = useToastContext();
    const {fetchSettingsData} = useSettingQueries(settingsApi);
    const {updateSettingsMutation} = useSettingMutations(settingsApi);

    const settingsData = fetchSettingsData();

    const handleSubmit = () => {
        updateSettingsMutation.mutate({settings});
    };

    useEffect(() => {
        if (!settingsData) return;

        if (settingsData.error) return addToast(settingsData.code, "error");

        setSettings(settingsData.settings! as Settings);
    }, [settingsData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <SettingsTable settings={settings} setSettings={setSettings}/>
                    <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
