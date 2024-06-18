import React, {useState} from "react";

type MenuEditFieldIsOptionalFormProps = {
    menuFieldId: number;
    menuFieldIsOptional: boolean;
    handleChangeFieldIsOptional: (menuFieldId: number, isOptional: boolean) => Promise<void>;
}

export default function MenuEditFieldIsOptionalForm({menuFieldId, menuFieldIsOptional, handleChangeFieldIsOptional}: MenuEditFieldIsOptionalFormProps) {
    const [newMenuFieldIsOptional, setNewMenuFieldIsOptional] = useState(menuFieldIsOptional);

    const handleMenuFieldIsOptionalChange = () => {
        setNewMenuFieldIsOptional((prevState) => !prevState);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await handleChangeFieldIsOptional(menuFieldId, newMenuFieldIsOptional);
    };

    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text">Is optional?</span>
                <div className="form-control d-flex justify-content-center">
                    <input className="form-check-input" type="checkbox" checked={newMenuFieldIsOptional} onChange={handleMenuFieldIsOptionalChange} />
                </div>
                <button className="btn btn-success">Change</button>
            </div>
        </form>
    );
}