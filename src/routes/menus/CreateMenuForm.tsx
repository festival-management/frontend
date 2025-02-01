import React, {useState} from "react";

import {Menu, UseMenusApiInterface} from "../../models/menus.model.ts";
import useMenuMutations from "../../hooks/mutations/use-menu-mutations.ts";

type CreateMenuFormProps = {
    menusApi: UseMenusApiInterface;
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateMenuForm({menusApi, setMenus, setTotalCount}: CreateMenuFormProps) {
    const [newMenuName, setNewMenuName] = useState("");
    const [newMenuShortName, setNewMenuShortName] = useState("");
    const [newMenuPrice, setNewMenuPrice] = useState(0);

    const {addMenuMutation} = useMenuMutations(menusApi);

    const handleNewMenuNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuName(event.target.value);
    };

    const handleNewMenuShortNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuShortName(event.target.value);
    };

    const handleNewMenuPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddMenu = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addMenuMutation.mutateAsync({
            name: newMenuName,
            shortName: newMenuShortName,
            price: newMenuPrice
        });

        if (!response.error) {
            setMenus((prevState) => [...prevState, response.menu!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewMenuName("");
        setNewMenuShortName("");
        setNewMenuPrice(0);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddMenu}>
            <h6>Create new menu</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newMenuName" className="form-control" value={newMenuName}
                       onChange={handleNewMenuNameChange}
                       required/>
                <span className="input-group-text">Short name</span>
                <input type="text" id="newMenuShortName" className="form-control" value={newMenuShortName}
                       onChange={handleNewMenuShortNameChange}
                       required/>
                <span className="input-group-text">Price</span>
                <input type="number" id="newMenuPrice" className="form-control" value={newMenuPrice} step='0.01'
                       onChange={handleNewMenuPriceChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}