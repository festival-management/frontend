import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldAdditionalCostFormProps = {
    menuField: MenuField;
}

export default function MenuEditFieldAdditionalCostForm({menuField}: MenuEditFieldAdditionalCostFormProps) {
    const [newMenuFieldAdditionalCost, setNewMenuFieldAdditionalCost] = useState(menuField.additional_cost);

    const {menusApi, menuId} = useMenuEditContext();
    const {updateMenuFieldAdditionalCostMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldAdditionalCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldAdditionalCost(parseFloat(event.target.value));
    };

    const handleSubmitChangeFieldMaxSortableElements = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuFieldAdditionalCostMutation.mutate({
            id: menuId,
            menuFieldId: menuField.id,
            additionalCost: newMenuFieldAdditionalCost
        });
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitChangeFieldMaxSortableElements}>
            <div className="input-group mb-3">
                <span className="input-group-text">Additional Cost</span>
                <input
                    type="number"
                    className="form-control"
                    id="menuFieldAdditionalCost"
                    placeholder="Input the additional cost of menu field"
                    value={newMenuFieldAdditionalCost}
                    onChange={handleNewMenuFieldAdditionalCostChange}
                    required
                />
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}