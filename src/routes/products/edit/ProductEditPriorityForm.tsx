import React from "react";

type ProductEditPriorityFormProps = {
    priority: boolean;
    handlePriorityChange: () => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductEditPriorityForm({
                                                    priority,
                                                    handlePriorityChange,
                                                    handleSubmit
                                                }: ProductEditPriorityFormProps) {
    return (
        <>
            <h6>Change priority</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="formInputPriority" checked={priority}
                               onChange={handlePriorityChange}/>
                        <label className="form-check-label" htmlFor="formInputPriority">
                            Is priority?
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}