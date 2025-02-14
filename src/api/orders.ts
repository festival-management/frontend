import {AxiosResponse} from "axios";

import API from "../env/api";
import useHttpClient from "./utils";
import BaseResponse from "../models/base.model.ts";
import {OrderMenu, OrderProduct, UseOrdersApiInterface} from "../models/order.model.ts";

const useOrdersApi = (): UseOrdersApiInterface => {
    const {http} = useHttpClient(API.ORDERS.toString());

    const addOrder = async (customer: string, guests: number | null, isTakeAway: boolean, table: number | null, products: OrderProduct[], menus: OrderMenu[]) => {
        const response: AxiosResponse<BaseResponse> = await http.post(
            "/",
            {customer, guests, is_take_away: isTakeAway, table, products, menus},
        );

        return response.data;
    };

    return {addOrder};
}

export default useOrdersApi;