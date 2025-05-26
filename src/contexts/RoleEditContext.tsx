import React, {createContext, ReactNode, useContext, useState} from 'react';

import useRolesApi from "../api/roles.ts";
import {Permission} from "../enums/permission.ts";
import {RolePrinter, UseRolesApiInterface} from "../models/roles.model.ts";

interface RoleEditContextType {
    roleId: number;
    setRoleId: React.Dispatch<React.SetStateAction<number>>;
    roleName: string;
    setRoleName: React.Dispatch<React.SetStateAction<string>>;
    rolePermissions: Map<Permission, boolean>;
    setRolePermissions: React.Dispatch<React.SetStateAction<Map<Permission, boolean>>>;
    rolePrinters: RolePrinter[];
    setRolePrinters: React.Dispatch<React.SetStateAction<RolePrinter[]>>;
    roleOrderConfirmerId: number;
    setRoleOrderConfirmerId: React.Dispatch<React.SetStateAction<number>>;
    rolesApi: UseRolesApiInterface;
}

const RoleEditContext = createContext<RoleEditContextType | undefined>(undefined);

interface RoleEditProviderProps {
    children: ReactNode;
}

export const RoleEditProvider = ({children}: RoleEditProviderProps) => {
    const [roleId, setRoleId] = useState(-1);
    const [roleName, setRoleName] = useState("");
    const [rolePermissions, setRolePermissions] = useState<Map<Permission, boolean>>(
        () =>
            new Map<Permission, boolean>(
                Object.values(Permission).map((permission) => [permission, false])
            )
    );
    const [rolePrinters, setRolePrinters] = useState<RolePrinter[]>([]);
    const [roleOrderConfirmerId, setRoleOrderConfirmerId] = useState<number>(-1);

    const rolesApi = useRolesApi();

    return (
        <RoleEditContext.Provider
            value={{
                roleId, setRoleId,
                roleName, setRoleName,
                rolePermissions, setRolePermissions,
                rolePrinters, setRolePrinters,
                roleOrderConfirmerId, setRoleOrderConfirmerId,
                rolesApi
            }}
        >
            {children}
        </RoleEditContext.Provider>
    );
};

export const useRoleEditContext = (): RoleEditContextType => {
    const context = useContext(RoleEditContext);

    if (!context) {
        throw new Error('useRoleEditContext must be used within a RoleEditProvider');
    }

    return context;
};