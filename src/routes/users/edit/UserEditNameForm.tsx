import React from "react";

type UserEditNameFormProps = {
    name: string;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function UserEditNameForm({name, handleNameChange, handleSubmit}: UserEditNameFormProps) {
    return (
        <>
            <h6>Change username</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputUserName"
                        placeholder="Input the new name of user"
                        value={name}
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