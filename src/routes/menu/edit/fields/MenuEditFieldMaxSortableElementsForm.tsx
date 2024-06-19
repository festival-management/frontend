import React, {useState} from "react";

type MenuEditFieldMaxSortableElementsFormProps = {
    menuFieldId: number;
    menuFieldMaxSortableElements: number;
    handleChangeFieldMaxSortableElements: (menuFieldId: number, maxSortableElements: number) => Promise<void>;
}

export default function MenuEditFieldMaxSortableElementsForm({
                                                                 menuFieldId,
                                                                 menuFieldMaxSortableElements,
                                                                 handleChangeFieldMaxSortableElements
                                                             }: MenuEditFieldMaxSortableElementsFormProps) {
    const [newMenuFieldMaxSortableElements, setNewMenuFieldMaxSortableElements] = useState(menuFieldMaxSortableElements);

    const handleMenuFieldMaxSortableElementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldMaxSortableElements(parseInt(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleChangeFieldMaxSortableElements(menuFieldId, newMenuFieldMaxSortableElements);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Max sortable elements</span>
                <input
                    type="number"
                    className="form-control"
                    id="menuFieldMaxSortableElements"
                    placeholder="Input the max sortable elements of menu field"
                    value={newMenuFieldMaxSortableElements}
                    onChange={handleMenuFieldMaxSortableElementsChange}
                    required
                />
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}