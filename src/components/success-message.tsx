import React, {useEffect, useState} from "react";

type SuccessMessageProps = {
    message: string;
    visible: boolean;
    afterTimeout: () => void;
}

export default function SuccessMessage({message, visible, afterTimeout}: SuccessMessageProps) {
    const [localVisible, setLocalVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setLocalVisible(true);
            const timer = setTimeout(() => {
                setLocalVisible(false);
                afterTimeout();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visible, afterTimeout]);

    return (
        <div>
            {localVisible && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div id="successToast" className="toast show align-items-center text-bg-success border-0" role="alert"
                         aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                {message}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto"
                                    data-bs-dismiss="toast" aria-label="Close" onClick={() => setLocalVisible(false)}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
