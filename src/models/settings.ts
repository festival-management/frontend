import BaseResponse from "./base.model";

export interface Settings {
    order_requires_confirmation: boolean;
    receipt_header: string;
    cover_charge: number;
}

export interface SettingsUser {
    order_requires_confirmation: boolean;
    cover_charge: number;
}

export interface GetSettingsResponse extends BaseResponse {
    settings?: Settings | SettingsUser;
}

export interface UseSettingsApiInterface {
    getSettings(): Promise<GetSettingsResponse>;
    updateSettings(settings: Settings): Promise<BaseResponse>;
}
