import {SubcategoryName} from "../models/subcategories.model.ts";

type SelectProductSubcategoryIdProps = {
    selectedSubcategoryId: number;
    subcategoriesName: SubcategoryName[];
    subcategoriesDone?: number[];
    handleSelectedSubcategoryIdChange: (subcategoryId: number) => void;
    isMenus?: boolean;
    isSelectedMenus?: boolean;
    hasMenusSelected?: boolean;
    handleIsSelectedMenusChange?: () => void;
}

export default function SelectProductSubcategoryId({
                                                       selectedSubcategoryId,
                                                       subcategoriesName,
                                                       subcategoriesDone = [],
                                                       handleSelectedSubcategoryIdChange,
                                                       isMenus,
                                                       isSelectedMenus,
                                                       hasMenusSelected,
                                                       handleIsSelectedMenusChange,
                                                   }: SelectProductSubcategoryIdProps) {
    return (
        <div className="btn-group d-flex flex-wrap mb-3" role="group" aria-label="Select Subcategory Id">
            {Object.values(subcategoriesName).map(subcategoryName => {
                const isSelected = selectedSubcategoryId === subcategoryName.id;
                const isDone = subcategoriesDone.includes(subcategoryName.id);

                return <button key={subcategoryName.id} type="button"
                        className={`btn ${isSelected ? 'btn-primary' : isDone ? 'btn-success' : 'btn-outline-primary'}`}
                        onClick={() => handleSelectedSubcategoryIdChange(subcategoryName.id)}>{subcategoryName.name}</button>;
            })}
            {isMenus &&
                <button type="button" className={`btn ${isSelectedMenus ? 'btn-primary' : hasMenusSelected ? 'btn-success' : 'btn-outline-primary'}`} onClick={handleIsSelectedMenusChange}>
                    Menus
                </button>
            }
        </div>
    );
}