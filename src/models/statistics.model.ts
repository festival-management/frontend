import BaseResponse from "./base.model";

export interface StatisticProduct {
    name: string;
    quantity: number;
    price: number;
}

export interface Statistic {
    total_orders: number;
    total_seated: number;
    total_take_away: number;
    products: StatisticProduct[];
}

export interface GetStatisticResponse extends BaseResponse, Partial<Statistic> {
}

export interface UseStatisticsApiInterface {
    getStatistic(startDate?: Date, endDate?: Date): Promise<GetStatisticResponse>;
}
