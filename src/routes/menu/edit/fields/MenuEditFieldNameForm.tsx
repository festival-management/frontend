import React, {useState} from "react";

type MenuEditFieldNameFormProps = {
    menuFieldId: number;
    menuFieldName: string;
    handleChangeFieldName: (menuFieldId: number, name: string) => Promise<void>;
}

export default function MenuEditFieldNameForm({menuFieldId, menuFieldName, handleChangeFieldName}: MenuEditFieldNameFormProps) {
    const [newMenuFieldName, setNewMenuFieldName] = useState(menuFieldName);

    const handleMenuFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMenuFieldName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleChangeFieldName(menuFieldId, newMenuFieldName);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                    type="text"
                    className="form-control"
                    id="menuFieldName"
                    placeholder="Input the name of menu field"
                    value={newMenuFieldName}
                    onChange={handleMenuFieldNameChange}
                    required
                />
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}