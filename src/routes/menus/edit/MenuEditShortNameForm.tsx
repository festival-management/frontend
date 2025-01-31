import React from "react";

import {useMenuEditContext} from "../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../hooks/mutations/use-menu-mutations.ts";

export default function MenuEditShortNameForm() {
    const {menusApi, menuId, menuShortName, setMenuShortName} = useMenuEditContext();
    const {updateMenuShortNameMutation} = useMenuMutations(menusApi);

    const handleShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenuShortName(event.target.value);
    };

    const handleSubmitChangeShortName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateMenuShortNameMutation.mutate({id: menuId, shortName: menuShortName});
    };

    return (
        <>
            <h6>Change short name</h6>
            <form onSubmit={handleSubmitChangeShortName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputShortName"
                        placeholder="Input the short name of menu"
                        value={menuShortName}
                        onChange={handleShortNameChange}
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