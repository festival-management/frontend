import React from "react";

type MenuEditFieldsAddProps = {
    newMenuFieldName: string;
    newMenuFieldMaxSortableElements: number;
    handleMenuFieldNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMenuFieldMaxSortableElementsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MenuEditFieldsAdd({
                                              newMenuFieldName,
                                              newMenuFieldMaxSortableElements,
                                              handleMenuFieldNameChange,
                                              handleMenuFieldMaxSortableElementsChange,
                                              handleSubmit
                                          }: MenuEditFieldsAddProps) {
    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="newMenuFieldName"
                    placeholder="Input the name of menu field"
                    value={newMenuFieldName}
                    onChange={handleMenuFieldNameChange}
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
                    onChange={handleMenuFieldMaxSortableElementsChange}
                    required
                />
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}