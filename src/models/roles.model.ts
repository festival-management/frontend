import BaseResponse from "./base.model";
import {Permission} from "../enums/permission";
import {PrinterType} from "../enums/printer-type.ts";

export interface RolePrinter {
    id: number;
    printer_id: number;
    printer_type: PrinterType;
}

export interface Role {
    id: number;
    name: string;
    permissions: Map<Permission, boolean>;
    printers?: RolePrinter[];
}

export interface RoleName {
    id: number;
    name: string;
}

export interface AddRolePrinterResponse extends BaseResponse {
    printer: RolePrinter;
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
    addRolePrinter(id: number, printerId: number, printerType: string): Promise<AddRolePrinterResponse>;
    deleteRole(id: number): Promise<BaseResponse>;
    deleteRolePrinter(id: number, rolePrinterId: number): Promise<BaseResponse>;
    getRoles(page: number, includePrinters?: boolean): Promise<GetRolesResponse>;
    getRolesById(id: number, includePrinters?: boolean): Promise<GetRoleResponse>;
    getRolesName(can_order?: boolean): Promise<GetRolesNameResponse>;
    updateRoleName(id: number, name: string): Promise<BaseResponse>;
    updateRolePermissions(id: number, permissions: Map<Permission, boolean>): Promise<BaseResponse>;
}
