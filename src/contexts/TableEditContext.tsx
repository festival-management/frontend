import React, {createContext, ReactNode, useContext, useState} from 'react';

import useTablesApi from "../api/tables.ts";
import {UseTablesApiInterface} from "../models/tables.model.ts";

interface TableEditContextType {
    tableId: number;
    setTableId: React.Dispatch<React.SetStateAction<number>>;
    tableName: string;
    setTableName: React.Dispatch<React.SetStateAction<string>>;
    tableSeatStart: number;
    setTableSeatStart: React.Dispatch<React.SetStateAction<number>>;
    tableSeatEnd: number;
    setTableSeatEnd: React.Dispatch<React.SetStateAction<number>>;
    tablesApi: UseTablesApiInterface;
}

const TableEditContext = createContext<TableEditContextType | undefined>(undefined);

interface TableEditProviderProps {
    children: ReactNode;
}

export const TableEditProvider = ({children}: TableEditProviderProps) => {
    const [tableId, setTableId] = useState(-1);
    const [tableName, setTableName] = useState("");
    const [tableSeatStart, setTableSeatStart] = useState(-1);
    const [tableSeatEnd, setTableSeatEnd] = useState(-1);

    const tablesApi = useTablesApi();

    return (
        <TableEditContext.Provider
            value={{
                tableId, setTableId,
                tableName, setTableName,
                tableSeatStart, setTableSeatStart,
                tableSeatEnd, setTableSeatEnd,
                tablesApi,
            }}
        >
            {children}
        </TableEditContext.Provider>
    );
};

export const useTableEditContext = (): TableEditContextType => {
    const context = useContext(TableEditContext);

    if (!context) {
        throw new Error('useTableEditContext must be used within a TableEditProvider');
    }

    return context;
};
