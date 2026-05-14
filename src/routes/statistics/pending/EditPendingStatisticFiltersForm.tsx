import React from "react";

import {RoleName} from "../../../models/roles.model.ts";

interface EditPendingStatisticFiltersFormProps {
    selectedRoleIds: number[];
    setSelectedRoleIds: React.Dispatch<React.SetStateAction<number[]>>;
    onlyConfirmedOrder: boolean;
    setOnlyConfirmedOrder: React.Dispatch<React.SetStateAction<boolean>>;
    rolesName: RoleName[];
}

export default function EditPendingStatisticFiltersForm({
                                                            selectedRoleIds,
                                                            setSelectedRoleIds,
                                                            onlyConfirmedOrder,
                                                            setOnlyConfirmedOrder,
                                                            rolesName,
                                                        }: EditPendingStatisticFiltersFormProps) {
    const handleSelectedRoleIdsChange = (roleId: number) => {
        setSelectedRoleIds(prev => {
            if (prev.includes(roleId)) {
                return prev.filter(id => id !== roleId);
            } else {
                return [...prev, roleId];
            }
        });
    };

    const handleOnlyConfirmedOrderChange = () => {
        setOnlyConfirmedOrder((v) => !v);
    };

    return (
        <form className="mb-3">
            <h6>Pending Statistic Filters:</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Roles</span>
                <div className="form-control">
                    <div className="d-flex flex-wrap gap-3">
                        {rolesName.map(role => (
                            <div key={role.id} className="form-check form-switch flex-shrink-0">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`role-${role.id}`}
                                    checked={selectedRoleIds.includes(role.id)}
                                    onChange={() => handleSelectedRoleIdsChange(role.id)}
                                />
                                <label className="form-check-label" htmlFor={`role-${role.id}`}>
                                    {role.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Only Confirmed Order?</span>
                <div className="form-control form-switch d-flex justify-content-center">
                    <input type="checkbox" id="onlyConfirmedOrder" className="form-check-input" checked={onlyConfirmedOrder}
                           onChange={handleOnlyConfirmedOrderChange}/>
                </div>
            </div>
        </form>
    );
}
