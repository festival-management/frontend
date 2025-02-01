import ProductEditDatesAdd from "./ProductEditDatesAdd.tsx";
import ProductEditDatesTable from "./ProductEditDatesTable.tsx";

export default function ProductEditDates() {
    return (
        <>
            <h6 className="mb-3">Dates</h6>
            <ProductEditDatesAdd/>
            <ProductEditDatesTable/>
            <hr/>
        </>
    );
}