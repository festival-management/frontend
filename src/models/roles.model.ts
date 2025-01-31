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

export interface CreateRoleResponse extends BaseResponse {
    role?: Role;
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

// Interface for the useRolesApi hook
export interface UseRolesApiInterface {
    addRole(name: string): Promise<CreateRoleResponse>;
    deleteRole(id: number): Promise<BaseResponse>;
    getRoles(page: number): Promise<GetRolesResponse>;
    getRolesById(id: number): Promise<GetRoleResponse>;
    getRolesName(can_order?: boolean): Promise<GetRolesNameResponse>;
    updateRoleName(id: number, name: string): Promise<BaseResponse>;
    updateRolePermissions(id: number, permissions: { [permission in Permission]: boolean }): Promise<BaseResponse>;
    updateRolePaperSize(id: number, paperSize: string): Promise<BaseResponse>;
}
