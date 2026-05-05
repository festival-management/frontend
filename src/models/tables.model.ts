import BaseResponse from "./base.model.ts";

export interface Table {
    id: number;
    name: string;
    seat_start: number;
    seat_end: number;
}

export interface TableName {
    id: number;
    name: string;
}

export interface CreateTableResponse extends BaseResponse {
    table?: Table;
}

export interface GetTableResponse extends BaseResponse, Partial<Table> {
}

export interface GetTablesResponse extends BaseResponse {
    total_count?: number;
    tables?: Table[];
}

export interface GetTablesNameResponse extends BaseResponse {
    total_count?: number;
    tables?: TableName[];
}

// Interface for the useTablesApi hook
export interface UseTablesApiInterface {
    addTable(name: string, seatStart: number, seatEnd: number): Promise<CreateTableResponse>;
    deleteTable(id: number): Promise<BaseResponse>;
    getTables(page: number): Promise<GetTablesResponse>;
    getTablesById(id: number): Promise<GetTableResponse>;
    updateTableName(id: number, name: string): Promise<BaseResponse>;
    updateTableSeats(id: number, seatStart: number, seatEnd: number): Promise<BaseResponse>;
}