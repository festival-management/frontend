import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldMaxSortableElementsFormProps = {
    menuField: MenuField;
}

export default function MenuEditFieldMaxSortableElementsForm({menuField}: MenuEditFieldMaxSortableElementsFormProps) {
    const [newMenuFieldMaxSortableElements, setNewMenuFieldMaxSortableElements] = useState(menuField.max_sortable_elements);

    const {menusApi, menuId} = useMenuEditContext();
    const {updateMenuFieldMaxSortableElementsMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldMaxSortableElementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldMaxSortableElements(parseInt(event.target.value));
    };

    const handleSubmitChangeFieldMaxSortableElements = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuFieldMaxSortableElementsMutation.mutate({
            id: menuId,
            menuFieldId: menuField.id,
            maxSortableElements: newMenuFieldMaxSortableElements
        });
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitChangeFieldMaxSortableElements}>
            <div className="input-group mb-3">
                <span className="input-group-text">Max sortable elements</span>
                <input
                    type="number"
                    className="form-control"
                    id="menuFieldMaxSortableElements"
                    placeholder="Input the max sortable elements of menu field"
                    value={newMenuFieldMaxSortableElements}
                    onChange={handleNewMenuFieldMaxSortableElementsChange}
                    required
                />
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}