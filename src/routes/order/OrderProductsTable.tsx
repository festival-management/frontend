import {useEffect, useMemo, useState} from "react";

import {Product} from "../../models/products.model.ts";
import useSubcategoriesApi from "../../api/subcategories.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {useOrderContext} from "../../contexts/OrderContext.tsx";
import {SubcategoryName} from "../../models/subcategories.model.ts";
import OrderProductsTableElement from "./OrderProductsTableElement.tsx";
import useSubcategoryQueries from "../../hooks/queries/use-subcategory-queries.ts";
import SelectProductSubcategoryId from "../../components/select-product-subcategory-id.tsx";

type OrderProductsTableProps = {
    products: Product[];
}

export default function OrderProductsTable({products}: OrderProductsTableProps) {
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);
    const [subcategoriesWithProducts, setSubcategoriesWithProducts] = useState<SubcategoryName[]>([]);
    const [subcategoriesDone, setSubcategoriesDone] = useState<number[]>([]);

    const {addToast} = useToastContext();
    const {orderProducts} = useOrderContext();
    const subcategoriesApi = useSubcategoriesApi();

    const {fetchSubcategoriesName} = useSubcategoryQueries(subcategoriesApi);

    const subcategoriesNameData = fetchSubcategoriesName("order");

    const handleSelectedSubcategoryIdChange = (subcategoryId: number) => {
        setSelectedSubcategoryId(subcategoryId);
    };

    const filteredProducts = useMemo(() => {
        return selectedSubcategoryId === -1
            ? []
            : products.filter(product => product.subcategory_id === selectedSubcategoryId);
    }, [selectedSubcategoryId, products]);

    useEffect(() => {
        if (!subcategoriesNameData) return;

        if (subcategoriesNameData.error) return addToast(subcategoriesNameData.code, "error");

        const subcategoriesSet = new Set(products.map(product => product.subcategory_id));
        setSubcategoriesWithProducts(
            subcategoriesNameData.subcategories!.filter(subcategory => subcategoriesSet.has(subcategory.id))
        );
    }, [subcategoriesNameData, products]);

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
            />
            <div className="row overflow-y-scroll remove-scrollbar">
                {filteredProducts.map(product => (
                    <div className="col-lg-6 col-12" key={product.id}>
                        <OrderProductsTableElement product={product}/>
                    </div>
                ))}
            </div>
        </>
    );
}