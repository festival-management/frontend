import React from "react";

import {Settings} from "../../models/settings.ts";

interface SettingsTableProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}


export default function SettingsTable({ settings, setSettings }: SettingsTableProps) {
    const handleChange = (key: keyof Settings) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = event.target;

        let value: string | number | boolean;

        if (target instanceof HTMLInputElement && target.type === "checkbox") {
            value = target.checked;
        } else if (target instanceof HTMLInputElement && target.type === "number") {
            value = Number(target.value);
        } else {
            value = target.value;
        }

        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    return (
        <>
            <h6>Settings</h6>
            <div>
                {(Object.keys(settings) as (keyof Settings)[]).map((key) => {
                    const value = settings[key];
                    const label = key.replace(/_/g, ' ');

                    let inputElement;

                    if (typeof value === "boolean") {
                        inputElement = (
                            <div className="form-check form-switch" key={key}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`settings-change-${key}`}
                                    checked={value}
                                    onChange={handleChange(key)}
                                />
                                <label className="form-check-label" htmlFor={`settings-change-${key}`}>
                                    {label}
                                </label>
                            </div>
                        );
                    } else if (typeof value === "number") {
                        inputElement = (
                            <div className="mb-3" key={key}>
                                <label htmlFor={`settings-change-${key}`} className="form-label">{label}</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`settings-change-${key}`}
                                    value={value}
                                    onChange={handleChange(key)}
                                />
                            </div>
                        );
                    } else {
                        inputElement = (
                            <div className="mb-3" key={key}>
                                <label htmlFor={`settings-change-${key}`} className="form-label">{label}</label>
                                <textarea
                                    className="form-control"
                                    id={`settings-change-${key}`}
                                    value={value}
                                    onChange={handleChange(key)}
                                    rows={3}
                                />
                            </div>
                        );
                    }

                    return inputElement;
                })}
            </div>
        </>
    );
}
