import React from 'react';

type ErrorMessageProps = {
    message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
    return message ? (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    ) : null;
}

export default ErrorMessage;
