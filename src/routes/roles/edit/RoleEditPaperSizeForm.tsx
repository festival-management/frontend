import React from "react";
import {PaperSize} from "../../../enums/paper-size";

type RoleEditPaperSizeFormProps = {
    paperSize: string;
    handlePaperSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function RoleEditPaperSizeForm({
                                                  paperSize,
                                                  handlePaperSizeChange,
                                                  handleSubmit
                                              }: RoleEditPaperSizeFormProps) {
    return (
        <>
            <h6>Change paper size</h6>
            <form onSubmit={handleSubmit}>
                <select id="formInputPaperSize" className="form-select mb-3" aria-label="Default select example" value={paperSize}
                        onChange={handlePaperSizeChange}>
                    <option value={PaperSize.UNDEFINED}>Open this select menu</option>
                    {Object.values(PaperSize).filter((paperSize) => paperSize !== PaperSize.UNDEFINED).map(paperSize => (
                        <option key={paperSize} value={paperSize}>{paperSize}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    );
}