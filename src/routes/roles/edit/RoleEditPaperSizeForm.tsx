import React, {useState} from "react";

import {PaperSize} from "../../../enums/paper-size";
import {UseRolesApiInterface} from "../../../models/roles.model.ts";
import useRoleMutations from "../../../hooks/mutations/use-role-mutations.ts";

type RoleEditPaperSizeFormProps = {
    rolesApi: UseRolesApiInterface;
    roleId: number;
    rolePaperSize: string | undefined;
}

export default function RoleEditPaperSizeForm({rolesApi, roleId, rolePaperSize}: RoleEditPaperSizeFormProps) {
    const [newRolePaperSize, setNewRolePaperSize] = useState(rolePaperSize || PaperSize.UNDEFINED);

    const {updateRolePaperSizeMutation} = useRoleMutations(rolesApi);

    const handlePaperSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRolePaperSize(event.target.value);
    };

    const handleSubmitChangePaperSize = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateRolePaperSizeMutation.mutate({id: roleId, paperSize: newRolePaperSize});
    };

    return (
        <>
            <h6>Change paper size</h6>
            <form onSubmit={handleSubmitChangePaperSize}>
                <select id="formInputPaperSize" className="form-select mb-3" aria-label="Default select example"
                        value={newRolePaperSize}
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