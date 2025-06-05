import React, {createContext, ReactNode, useContext, useState} from 'react';
import {isEqual} from "lodash";

import {CreateOrderMenu, CreateOrderProduct} from "../models/order.model.ts";

interface OrderContextType {
    orderCustomer: string;
    setOrderCustomer: React.Dispatch<React.SetStateAction<string>>;
    orderGuests: number;
    setOrderGuests: React.Dispatch<React.SetStateAction<number>>;
    orderIsTakeAway: boolean;
    setOrderIsTakeAway: React.Dispatch<React.SetStateAction<boolean>>;
    orderTable: number;
    setOrderTable: React.Dispatch<React.SetStateAction<number>>;
    orderIsVoucher: boolean;
    setOrderIsVoucher: React.Dispatch<React.SetStateAction<boolean>>;
    orderParentOrder: number | null;
    setOrderParentOrder: React.Dispatch<React.SetStateAction<number | null>>;
    orderProducts: CreateOrderProduct[];
    setOrderProducts: React.Dispatch<React.SetStateAction<CreateOrderProduct[]>>;
    orderMenus: CreateOrderMenu[];
    setOrderMenus: React.Dispatch<React.SetStateAction<CreateOrderMenu[]>>;
    addProduct(product: CreateOrderProduct): void;
    addMenu(menu: CreateOrderMenu): void
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
    const [orderIsVoucher, setOrderIsVoucher] = useState(false);
    const [orderParentOrder, setOrderParentOrder] = useState<number | null>(null);
    const [orderProducts, setOrderProducts] = useState<CreateOrderProduct[]>([]);
    const [orderMenus, setOrderMenus] = useState<CreateOrderMenu[]>([]);

    const _isEqual = (a: CreateOrderProduct | CreateOrderMenu, b: CreateOrderProduct | CreateOrderMenu): boolean => {
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

    const mergeOrderItems = <T extends CreateOrderProduct | CreateOrderMenu>(items: T[]): T[] => {
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

    const addProduct = (product: CreateOrderProduct) => {
        const newOrderProducts = mergeOrderItems([...orderProducts, product]);
        setOrderProducts(newOrderProducts);
    };

    const addMenu = (menu: CreateOrderMenu) => {
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
                orderIsVoucher, setOrderIsVoucher,
                orderParentOrder, setOrderParentOrder,
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