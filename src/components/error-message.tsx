import React, {useEffect, useState} from 'react';

type ErrorMessageProps = {
    message: string;
    visible: boolean;
    afterTimeout: () => void;
};

function ErrorMessage({message, visible, afterTimeout}: ErrorMessageProps) {
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
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
}

export default ErrorMessage;
