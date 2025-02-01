import ProductEditVariantsAdd from "./ProductEditVariantsAdd.tsx";
import ProductEditVariantsTable from "./ProductEditVariantsTable.tsx";

export default function ProductEditVariants() {
    return (
        <>
            <h6 className="mb-3">Variants</h6>
            <ProductEditVariantsAdd/>
            <ProductEditVariantsTable/>
        </>
    );
}