import React from "react";

import {useMenuEditContext} from "../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../hooks/mutations/use-menu-mutations.ts";

export default function MenuEditNameForm() {
    const {menusApi, menuId, menuName, setMenuName} = useMenuEditContext();
    const {updateMenuNameMutation} = useMenuMutations(menusApi);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuName(event.target.value);
    };

    const handleSubmitChangeName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuNameMutation.mutate({id: menuId, name: menuName});
    };

    return (
        <>
            <h6>Change name</h6>
            <form onSubmit={handleSubmitChangeName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputName"
                        placeholder="Input the name of menu"
                        value={menuName}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}