import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldCanExceedMaxSortableFormProps = {
    menuField: MenuField;
}

export default function MenuEditFieldCanExceedMaxSortableForm({menuField}: MenuEditFieldCanExceedMaxSortableFormProps) {
    const [newMenuFieldCanExceedMaxSortable, setNewMenuFieldCanExceedMaxSortable] = useState(menuField.can_exceed_max_sortable);

    const {menusApi, menuId} = useMenuEditContext();
    const {updateMenuFieldCanExceedMaxSortableMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldCanExceedMaxSortableChange = () => {
        setNewMenuFieldCanExceedMaxSortable((prevState) => !prevState);
    };

    const handleSubmitChangeFieldCanExceedMaxSortable = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuFieldCanExceedMaxSortableMutation.mutate({
            id: menuId,
            menuFieldId: menuField.id,
            canExceedMaxSortable: newMenuFieldCanExceedMaxSortable
        });
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitChangeFieldCanExceedMaxSortable}>
            <div className="input-group mb-3">
                <span className="input-group-text">Can Exceed Max Sortable?</span>
                <div className="form-control form-switch d-flex justify-content-center">
                    <input className="form-check-input" id="menuFieldCanExceedMaxSortablel" type="checkbox" checked={newMenuFieldCanExceedMaxSortable}
                           onChange={handleNewMenuFieldCanExceedMaxSortableChange}/>
                </div>
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}