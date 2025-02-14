import React, {createContext, ReactNode, useContext, useState} from 'react';
import {isEqual} from "lodash";

import {OrderMenu, OrderProduct} from "../models/order.model.ts";

interface OrderContextType {
    orderCustomer: string;
    setOrderCustomer: React.Dispatch<React.SetStateAction<string>>;
    orderGuests: number;
    setOrderGuests: React.Dispatch<React.SetStateAction<number>>;
    orderIsTakeAway: boolean;
    setOrderIsTakeAway: React.Dispatch<React.SetStateAction<boolean>>;
    orderTable: number;
    setOrderTable: React.Dispatch<React.SetStateAction<number>>;
    orderProducts: OrderProduct[];
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
    orderMenus: OrderMenu[];
    setOrderMenus: React.Dispatch<React.SetStateAction<OrderMenu[]>>;

    addProduct(product: OrderProduct): void;

    addMenu(menu: OrderMenu): void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider = ({children}: OrderProviderProps) => {
    const [orderCustomer, setOrderCustomer] = useState("");
    const [orderGuests, setOrderGuests] = useState(1);
    const [orderIsTakeAway, setOrderIsTakeAway] = useState(false);
    const [orderTable, setOrderTable] = useState(1);
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
    const [orderMenus, setOrderMenus] = useState<OrderMenu[]>([]);

    const _isEqual = (a: OrderProduct | OrderMenu, b: OrderProduct | OrderMenu): boolean => {
        if ("product_id" in a && "product_id" in b) {
            return a.product_id === b.product_id &&
                a.variant_id === b.variant_id &&
                isEqual(a.ingredients, b.ingredients);
        }

        if ("menu_id" in a && "menu_id" in b) {
            return a.menu_id === b.menu_id &&
                isEqual(a.fields, b.fields);
        }

        return false;
    };

    const mergeOrderItems = <T extends OrderProduct | OrderMenu>(items: T[]): T[] => {
        const mergedItems: T[] = [];

        items.forEach((item) => {
            const existingItemIndex = mergedItems.findIndex((mergedItem) =>
                _isEqual(item, mergedItem)
            );

            if (existingItemIndex === -1) {
                mergedItems.push(item);
            } else {
                const existingItem = mergedItems[existingItemIndex];
                existingItem.quantity += item.quantity;
                existingItem.price += item.price;
            }
        });

        return mergedItems;
    };

    const addProduct = (product: OrderProduct) => {
        const newOrderProducts = mergeOrderItems([...orderProducts, product]);
        setOrderProducts(newOrderProducts);
    };

    const addMenu = (menu: OrderMenu) => {
        const newOrderMenus = mergeOrderItems([...orderMenus, menu]);
        setOrderMenus(newOrderMenus);
    };

    return (
        <OrderContext.Provider
            value={{
                orderCustomer, setOrderCustomer,
                orderGuests, setOrderGuests,
                orderIsTakeAway, setOrderIsTakeAway,
                orderTable, setOrderTable,
                orderProducts, setOrderProducts,
                orderMenus, setOrderMenus,
                addProduct, addMenu
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = (): OrderContextType => {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error('useOrderContext must be used within a OrderProvider');
    }

    return context;
};