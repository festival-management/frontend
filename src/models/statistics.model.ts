import BaseResponse from "./base.model";

export interface StatisticProduct {
    name: string;
    quantity: number;
    price: number;
    total_price: number;
}

export interface Statistic {
    total_orders: number;
    total_seated: number;
    total_take_away: number;
    total_voucher: number;
    total_price_with_cover: number;
    total_price_without_cover: number;
    products: StatisticProduct[];
}

export interface GetStatisticResponse extends BaseResponse, Partial<Statistic> {
}

export interface UseStatisticsApiInterface {
    getStatistic(startDate?: Date, endDate?: Date, roleIds?: number[]): Promise<GetStatisticResponse>;
}
