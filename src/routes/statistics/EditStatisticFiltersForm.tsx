import React from "react";

interface EditStatisticFiltersFormProps {
    startDate: Date | undefined;
    setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    endDate: Date | undefined;
    setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function EditStatisticFiltersForm({
                                                     startDate,
                                                     setStartDate,
                                                     endDate,
                                                     setEndDate
                                                 }: EditStatisticFiltersFormProps) {
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(new Date(event.target.value));
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(new Date(event.target.value));
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
        </form>
    );
}
