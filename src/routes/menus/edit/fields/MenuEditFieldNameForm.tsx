import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldNameFormProps = {
    menuField: MenuField;
}

export default function MenuEditFieldNameForm({menuField}: MenuEditFieldNameFormProps) {
    const [newMenuFieldName, setNewMenuFieldName] = useState(menuField.name);

    const {menusApi, menuId, setMenuFields} = useMenuEditContext();
    const {updateMenuFieldNameMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldName(event.target.value);
    };

    const handleSubmitChangeFieldName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await updateMenuFieldNameMutation.mutateAsync({
            id: menuId,
            menuFieldId: menuField.id,
            name: newMenuFieldName
        });

        if (!response.error) {
            setMenuFields((prevState) => prevState.map((menuField) => menuField.id === menuField.id ? {
                ...menuField,
                name: newMenuFieldName
            } : menuField));
        }
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitChangeFieldName}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="menuFieldName"
                    placeholder="Input the name of menu field"
                    value={newMenuFieldName}
                    onChange={handleNewMenuFieldNameChange}
                    required
                />
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}