import React from "react";

import {RoleName} from "../../models/roles.model.ts";

interface EditStatisticFiltersFormProps {
    startDate: Date | undefined;
    setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    endDate: Date | undefined;
    setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    selectedRoleIds: number[];
    setSelectedRoleIds: React.Dispatch<React.SetStateAction<number[]>>;
    rolesName: RoleName[];
}

export default function EditStatisticFiltersForm({
                                                     startDate,
                                                     setStartDate,
                                                     endDate,
                                                     setEndDate,
                                                     selectedRoleIds,
                                                     setSelectedRoleIds,
                                                     rolesName,
                                                 }: EditStatisticFiltersFormProps) {
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(new Date(event.target.value));
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(new Date(event.target.value));
    };

    const handleSelectedRoleIdsChange = (roleId: number) => {
        setSelectedRoleIds(prev => {
            if (prev.includes(roleId)) {
                return prev.filter(id => id !== roleId);
            } else {
                return [...prev, roleId];
            }
        });
    };

    const formatDateForInput = (date: Date | undefined): string => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    return (
        <form className="mb-3">
            <h6>Statistic Filters:</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Start Date</span>
                <input type="date" id="startDateFilter" className="form-control" value={formatDateForInput(startDate)}
                       onChange={handleStartDateChange}
                       required/>
                <span className="input-group-text">End Date</span>
                <input type="date" id="endDateFilter" className="form-control" value={formatDateForInput(endDate)}
                       onChange={handleEndDateChange}
                       required/>

            </div>
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
        </form>
    );
}
