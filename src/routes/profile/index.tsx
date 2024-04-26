import React, {useCallback, useEffect, useState} from 'react';

import useUsersApi from "../../api/users";
import ErrorMessage from "../../components/error-message";
import SuccessMessage from "../../components/success-message";
import ProfileEditPasswordForm from "./ProfileEditPasswordForm";

export default function RouteProfile() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const usersApi = useUsersApi();

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    }

    const handleAfterTimeoutSaved = () => {
        setIsSaved(false);
    }

    const fetchData = useCallback(async () => {
        const data = await usersApi.getUser();

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setUserName(data.username!);

        // eslint-disable-next-line
    }, []);

    const handleSubmitChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await usersApi.updateUserPassword(password);

        if (data.error) {
            setHasError(true);
            return setErrorMessage(data.message);
        }

        setIsSaved(true);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
                    <SuccessMessage message="Done" visible={isSaved} afterTimeout={handleAfterTimeoutSaved}/>
                    <div className="mb-3">
                        Username: {userName}
                    </div>
                    <hr/>
                    <ProfileEditPasswordForm password={password} handlePasswordChange={handlePasswordChange}
                                             handleSubmit={handleSubmitChangePassword}/>
                </div>
            </div>
        </div>
    );
}