import React, {createContext, ReactNode, useContext, useState} from 'react';

import {MenuDate, MenuField, MenuRole, UseMenusApiInterface} from "../models/menus.model.ts";
import useMenusApi from "../api/menus.ts";

interface MenuEditContextType {
    menuId: number;
    setMenuId: React.Dispatch<React.SetStateAction<number>>;
    menuName: string;
    setMenuName: React.Dispatch<React.SetStateAction<string>>;
    menuShortName: string;
    setMenuShortName: React.Dispatch<React.SetStateAction<string>>;
    menuPrice: number;
    setMenuPrice: React.Dispatch<React.SetStateAction<number>>;
    menuDailyMaxSales: number | null;
    setMenuDailyMaxSales: React.Dispatch<React.SetStateAction<number | null>>;
    menuDates: MenuDate[];
    setMenuDates: React.Dispatch<React.SetStateAction<MenuDate[]>>;
    menuFields: MenuField[];
    setMenuFields: React.Dispatch<React.SetStateAction<MenuField[]>>;
    menuRoles: MenuRole[];
    setMenuRoles: React.Dispatch<React.SetStateAction<MenuRole[]>>;
    menusApi: UseMenusApiInterface;
}

const MenuEditContext = createContext<MenuEditContextType | undefined>(undefined);

interface MenuEditProviderProps {
    children: ReactNode;
}

export const MenuEditProvider = ({children}: MenuEditProviderProps) => {
    const [menuId, setMenuId] = useState(-1);
    const [menuName, setMenuName] = useState("");
    const [menuShortName, setMenuShortName] = useState("");
    const [menuPrice, setMenuPrice] = useState(0);
    const [menuDailyMaxSales, setMenuDailyMaxSales] = useState<number | null>(null);
    const [menuDates, setMenuDates] = useState<MenuDate[]>([]);
    const [menuFields, setMenuFields] = useState<MenuField[]>([]);
    const [menuRoles, setMenuRoles] = useState<MenuRole[]>([]);

    const menusApi = useMenusApi();

    return (
        <MenuEditContext.Provider
            value={{
                menuId, setMenuId,
                menuName, setMenuName,
                menuShortName, setMenuShortName,
                menuPrice, setMenuPrice,
                menuDailyMaxSales, setMenuDailyMaxSales,
                menuDates, setMenuDates,
                menuFields, setMenuFields,
                menuRoles, setMenuRoles,
                menusApi
            }}
        >
            {children}
        </MenuEditContext.Provider>
    );
};

export const useMenuEditContext = (): MenuEditContextType => {
    const context = useContext(MenuEditContext);

    if (!context) {
        throw new Error('useMenuEditContext must be used within a MenuEditProvider');
    }

    return context;
};
