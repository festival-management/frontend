import React, {useState} from "react";

import {MenuField} from "../../../../models/menus.model.ts";
import {ProductName} from "../../../../models/products.model.ts";
import {useMenuEditContext} from "../../../../contexts/MenuEditContext.tsx";
import useMenuMutations from "../../../../hooks/mutations/use-menu-mutations.ts";

type MenuEditFieldProductAddProps = {
    menuField: MenuField;
    productsName: ProductName[];
}

export default function MenuEditFieldProductAdd({menuField, productsName}: MenuEditFieldProductAddProps) {
    const [newMenuFieldProductId, setNewMenuFieldProductId] = useState(-1);
    const [newMenuFieldPrice, setNewMenuFieldPrice] = useState(0);

    const {menusApi, menuId, setMenuFields} = useMenuEditContext();
    const {addMenuFieldProductMutation} = useMenuMutations(menusApi);

    const handleNewMenuFieldProductIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewMenuFieldProductId(parseInt(event.target.value));
    };

    const handleNewMenuFieldPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldPrice(parseFloat(event.target.value));
    };

    const handleSubmitAddFieldProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addMenuFieldProductMutation.mutateAsync({
            id: menuId,
            menuFieldId: menuField.id,
            price: newMenuFieldPrice,
            productId: newMenuFieldProductId
        });

        if (!response.error) {
            setMenuFields((prevState) => prevState.map((menuField) => menuField.id === menuField.id ? {
                ...menuField,
                products: [...(menuField.products || []), response.field_product!]
            } : menuField));
        }

        setNewMenuFieldProductId(-1);
        setNewMenuFieldPrice(0);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddFieldProduct}>
            <div className="input-group mb-3">
                <span className="input-group-text">Product</span>
                <select className="form-select" id="newMenuFieldProductId"
                        value={newMenuFieldProductId}
                        onChange={handleNewMenuFieldProductIdChange}>
                    <option value="-1">Select Product</option>
                    {Object.values(productsName).map(productName => (
                        <option key={productName.id} value={productName.id}>{productName.name}</option>
                    ))}
                </select>
                <span className="input-group-text">Price</span>
                <input
                    type="number"
                    className="form-control"
                    id="newMenuFieldPrice"
                    step="0.01"
                    value={newMenuFieldPrice}
                    onChange={handleNewMenuFieldPriceChange}
                    required
                />
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}