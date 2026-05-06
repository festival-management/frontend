import BaseResponse from "./base.model";
import {Permission} from "../enums/permission";
import {PrinterType} from "../enums/printer-type.ts";

export interface RolePrinter {
    id: number;
    printer_id: number;
    printer_type: PrinterType;
}

export interface RoleTable {
    id: number;
    table_id: number;
}

export interface Role {
    id: number;
    name: string;
    permissions: Map<Permission, boolean>;
    order_confirmer: Role;
    printers?: RolePrinter[];
    tables?: RoleTable[];
}

export interface RoleName {
    id: number;
    name: string;
}

export interface AddRolePrinterResponse extends BaseResponse {
    printer: RolePrinter;
}

export interface AddRoleTableResponse extends BaseResponse {
    table: RoleTable;
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
    addRoleTable(id: number, tableId: number): Promise<AddRoleTableResponse>;
    deleteRole(id: number): Promise<BaseResponse>;
    deleteRolePrinter(id: number, rolePrinterId: number): Promise<BaseResponse>;
    deleteRoleTable(id: number, roleTableId: number): Promise<BaseResponse>;
    getRoles(page: number, includePrinters?: boolean, includeTables?: boolean): Promise<GetRolesResponse>;
    getRolesById(id: number, includeOrderConfirmer?: boolean, includePrinters?: boolean, includeTables?: boolean): Promise<GetRoleResponse>;
    getRolesName(can_order?: boolean, canConfirmOrders?: boolean): Promise<GetRolesNameResponse>;
    updateRoleName(id: number, name: string): Promise<BaseResponse>;
    updateRolePermissions(id: number, permissions: Map<Permission, boolean>): Promise<BaseResponse>;
    updateRoleOrderConfirmer(id: number, orderConfirmerId: number): Promise<BaseResponse>;
}
