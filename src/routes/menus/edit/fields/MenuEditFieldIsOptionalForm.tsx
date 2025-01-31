import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldIsOptionalFormProps = {
    menuField: MenuField;
}

export default function MenuEditFieldIsOptionalForm({menuField}: MenuEditFieldIsOptionalFormProps) {
    const [newMenuFieldIsOptional, setNewMenuFieldIsOptional] = useState(menuField.is_optional);

    const {menusApi, menuId} = useMenuEditContext();
    const {updateMenuFieldIsOptionalMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldIsOptionalChange = () => {
        setNewMenuFieldIsOptional((prevState) => !prevState);
    };

    const handleSubmitChangeFieldIsOptional = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuFieldIsOptionalMutation.mutate({
            id: menuId,
            menuFieldId: menuField.id,
            isOptional: newMenuFieldIsOptional
        });
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitChangeFieldIsOptional}>
            <div className="input-group mb-3">
                <span className="input-group-text">Is optional?</span>
                <div className="form-control d-flex justify-content-center">
                    <input className="form-check-input" id="menuFieldIsOptional" type="checkbox" checked={newMenuFieldIsOptional}
                           onChange={handleNewMenuFieldIsOptionalChange}/>
                </div>
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}