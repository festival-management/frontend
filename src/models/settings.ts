import BaseResponse from "./base.model";

export interface Settings {
    order_requires_confirmation: boolean;
}

export interface GetSettingsResponse extends BaseResponse, Partial<Settings> {
}

export interface UseSettingsApiInterface {
    getSettings(): Promise<GetSettingsResponse>;
    updateSettings(settings: Settings): Promise<BaseResponse>;
}
