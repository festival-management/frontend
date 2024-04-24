import BaseResponse from "./base.model";
import {Permission} from "../enums/permission";

export interface Role {
    id: number;
    name: string;
}

export interface GetRolesResponse extends BaseResponse {
    total_count?: number;
    roles?: Role[];
}

export interface GetRoleResponse extends BaseResponse {
    id?: number;
    name?: string;
    permissions?: { [permission in Permission]: boolean };
}
