import React from "react";

import {Settings, UseSettingsApiInterface} from "../../models/settings.ts";

interface SettingsTableProps {
    settingsApi: UseSettingsApiInterface;
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function SettingsTable({settingsApi, settings, setSettings}: SettingsTableProps) {
    const handleCheckboxChange = (key: keyof Settings) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: event.target.checked,
        }));
    };

    return (
        <>
            <h6>Settings</h6>
            <div>
                {Object.keys(settings).map((key) => {
                    const settingKey = key as keyof Settings;
                    return (
                        <div className="form-check form-switch" key={settingKey}>
                            <input className="form-check-input" type="checkbox" role="switch"
                                   id={`settings-change-${settingKey}`} checked={settings[settingKey]}
                                   onChange={handleCheckboxChange(settingKey)}/>
                            <label className="form-check-label"
                                   htmlFor={`settings-change-${settingKey}`}>{settingKey.replace(/_/g, ' ')}</label>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
