import MenuEditDatesAdd from "./MenuEditDatesAdd.tsx";
import MenuEditDatesTable from "./MenuEditDatesTable.tsx";

export default function MenuEditDates() {
    return (
        <>
            <h6 className="mb-3">Dates</h6>
            <MenuEditDatesAdd/>
            <MenuEditDatesTable/>
            <hr/>
        </>
    );
}