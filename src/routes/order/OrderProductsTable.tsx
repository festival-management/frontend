import {useEffect, useMemo, useState} from "react";

import {Category} from "../../enums/category.ts";
import {Menu} from "../../models/menus.model.ts";
import {Product} from "../../models/products.model.ts";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import OrderMenusTableElement from "./OrderMenusTableElement.tsx";
import {SubcategoryName} from "../../models/subcategories.model.ts";
import OrderProductsTableElement from "./OrderProductsTableElement.tsx";
import SelectProductSubcategoryId from "../../components/select-product-subcategory-id.tsx";

type OrderProductsTableProps = {
    subcategoriesName: SubcategoryName[];
    products: Product[];
    menus: Menu[];
    resetSubcategoryTrigger?: number;
}

export default function OrderProductsTable({subcategoriesName, products, menus, resetSubcategoryTrigger}: OrderProductsTableProps) {
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);
    const [subcategoriesWithProducts, setSubcategoriesWithProducts] = useState<SubcategoryName[]>([]);
    const [subcategoriesDone, setSubcategoriesDone] = useState<number[]>([]);
    const [isSelectedMenus, setIsSelectedMenus] = useState(false);

    const {orderProducts, orderMenus, orderIsTakeAway} = useOrderContext();

    const handleSelectedSubcategoryIdChange = (subcategoryId: number) => {
        setSelectedSubcategoryId(subcategoryId);
        setIsSelectedMenus(false);
    };

    const handleIsSelectedMenusChange = () => {
        setIsSelectedMenus((prevState) => !prevState);
        setSelectedSubcategoryId(-1);
    };

    const effectiveProducts = useMemo(() => {
        return orderIsTakeAway
            ? products.filter(product => product.category !== Category.DRINK)
            : products;
    }, [products, orderIsTakeAway]);

    const filteredProducts = useMemo(() => {
        return selectedSubcategoryId === -1
            ? []
            : effectiveProducts.filter(product => product.subcategory_id === selectedSubcategoryId);
    }, [selectedSubcategoryId, effectiveProducts]);

    useEffect(() => {
        const subcategoriesSet = new Set(effectiveProducts.map(product => product.subcategory_id));

        const filteredSubcategories = subcategoriesName.filter(
            subcategory => subcategoriesSet.has(subcategory.id)
        );

        setSubcategoriesWithProducts(filteredSubcategories);

        setSelectedSubcategoryId(
            filteredSubcategories.length > 0 ? filteredSubcategories[0].id : -1
        );
    }, [subcategoriesName, effectiveProducts]);

    useEffect(() => {
        if (subcategoriesWithProducts.length > 0) {
            setSelectedSubcategoryId(subcategoriesWithProducts[0].id);
        }
    }, [resetSubcategoryTrigger]);

    useEffect(() => {
        setSubcategoriesDone([...new Set(orderProducts.map((value) => products.find((p) => p.id === value.product_id)?.subcategory_id || -1))]);
    }, [orderProducts, products]);

    return (
        <>
            <SelectProductSubcategoryId
                selectedSubcategoryId={selectedSubcategoryId}
                subcategoriesName={subcategoriesWithProducts}
                subcategoriesDone={subcategoriesDone}
                handleSelectedSubcategoryIdChange={handleSelectedSubcategoryIdChange}
                isMenus={menus.length > 0}
                isSelectedMenus={isSelectedMenus}
                hasMenusSelected={orderMenus.length > 0}
                handleIsSelectedMenusChange={handleIsSelectedMenusChange}
            />
            <div className="row overflow-y-scroll remove-scrollbar">
                <table className="table table-sm table-striped">
                    <thead className="small">
                    <tr>
                        <th scope="col">Name</th>
                        {isSelectedMenus && <th scope="col">Field Name</th>}
                        {isSelectedMenus && <th scope="col">Field Product Name</th>}
                        <th scope="col">{isSelectedMenus && "Product "}Variant</th>
                        <th scope="col">{isSelectedMenus && "Product "}Ingredients</th>
                        {isSelectedMenus && <th scope="col">Product Quantity</th>}
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="small">
                    {
                        isSelectedMenus ? menus.map((menu) => (
                                <OrderMenusTableElement
                                    key={menu.id}
                                    menu={menu}
                                />
                            )) :
                            filteredProducts.map(product => (
                                <OrderProductsTableElement product={product} key={product.id}/>
                            ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}