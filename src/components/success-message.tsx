import React, {useEffect, useState} from "react";

type SuccessMessageProps = {
    message: string;
    visible: boolean;
    afterTimeout: () => void;
}

export default function SuccessMessage({ message, visible, afterTimeout }: SuccessMessageProps) {
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
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
}
