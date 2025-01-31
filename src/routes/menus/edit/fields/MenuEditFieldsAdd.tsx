import React, {useState} from "react";

import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

export default function MenuEditFieldsAdd() {
    const [newMenuFieldName, setNewMenuFieldName] = useState("");
    const [newMenuFieldMaxSortableElements, setNewMenuFieldMaxSortableElements] = useState(0);
    const [newMenuFieldAdditionalCost, setNewMenuFieldAdditionalCost] = useState(0);

    const {menusApi, menuId, setMenuFields} = useMenuEditContext();
    const {addMenuFieldMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldName(event.target.value);
    };

    const handleNewMenuFieldMaxSortableElementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldMaxSortableElements(parseInt(event.target.value));
    };

    const handleNewMenuFieldAdditionalCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldAdditionalCost(parseFloat(event.target.value));
    };

    const handleSubmitAddField = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addMenuFieldMutation.mutateAsync({
            id: menuId,
            name: newMenuFieldName,
            maxSortableElements: newMenuFieldMaxSortableElements,
            additionalCoast: newMenuFieldAdditionalCost
        });

        if (!response.error) {
            setMenuFields((prevState) => [...prevState, response.field!]);
        }

        setNewMenuFieldName("");
        setNewMenuFieldMaxSortableElements(0);
        setNewMenuFieldAdditionalCost(0);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddField}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="newMenuFieldName"
                    placeholder="Input the name of menu field"
                    value={newMenuFieldName}
                    onChange={handleNewMenuFieldNameChange}
                    required
                />
                <span className="input-group-text">Max sortable elements</span>
                <input
                    type="number"
                    className="form-control"
                    id="newMenuFieldMaxSortableElements"
                    placeholder="Input the max sortable elements"
                    min="0"
                    value={newMenuFieldMaxSortableElements}
                    onChange={handleNewMenuFieldMaxSortableElementsChange}
                    required
                />
                <span className="input-group-text">Additional cost</span>
                <input
                    type="number"
                    className="form-control"
                    id="newMenuFieldAdditionalCost"
                    placeholder="Input the additional cost"
                    min="0"
                    step="0.01"
                    value={newMenuFieldAdditionalCost}
                    onChange={handleNewMenuFieldAdditionalCostChange}
                    required
                />
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}