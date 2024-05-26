import React from "react";

type ProductEditShortNameFormProps = {
    shortName: string;
    handleShortNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditShortNameForm({
                                                     shortName,
                                                     handleShortNameChange,
                                                     handleSubmit
                                                 }: ProductEditShortNameFormProps) {
    return (
        <>
            <h6>Change short name</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputShortName"
                        placeholder="Input the short name of product"
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