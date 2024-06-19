import React from "react";

type MenuEditShortNameFormProps = {
    shortName: string;
    handleShortNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MenuEditShortNameForm({
                                                  shortName,
                                                  handleShortNameChange,
                                                  handleSubmit
                                              }: MenuEditShortNameFormProps) {
    return (
        <>
            <h6>Change short name</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputShortName"
                        placeholder="Input the short name of menu"
                        value={shortName}
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