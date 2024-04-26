import BaseResponse from "./base.model";
import {PaperSize} from "../enums/paper-size";
import {Permission} from "../enums/permission";

export interface Role {
    id: number;
    name: string;
    permissions: { [permission in Permission]: boolean };
    paper_size?: PaperSize;
}

export interface RoleName {
    id: number;
    name: string;
}

export interface GetRolesResponse extends BaseResponse {
    total_count?: number;
    roles?: Role[];
}

export interface GetRoleResponse extends BaseResponse, Partial<Role> {
}

export interface GetRolesNameResponse extends BaseResponse {
    total_count?: number;
    roles?: RoleName[];
}
