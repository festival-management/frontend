import React from "react";

import {MenuField} from "../../../../models/menus.model.ts";

type MenuEditFieldsTableProps = {
    data: MenuField[];
    handleDelete: (menuFieldId: number) => Promise<void>;
}

export default function MenuEditFieldsTable({data, handleDelete}: MenuEditFieldsTableProps) {
    const menuFields: React.JSX.Element[] = data.map((v, index) => (
        <div key={index} className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                    {v.name}
                </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionField">
                <div className="accordion-body">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(v.id)}
                    >
                        <i className="bi bi-trash"/> Delete
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="accordion" id="accordionField">
            {menuFields}
        </div>
    );
}