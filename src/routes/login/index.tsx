import React, {useState} from 'react';

import LoginForm from "./LoginForm";
import useAuthApi from "../../api/auth";
import ErrorMessage from "../../components/error-message";

export default function RouteLogin() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authApi = useAuthApi();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleAfterTimeoutError = () => {
        setHasError(false);
        setErrorMessage("");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resp = await authApi.login(username, password);

        if (resp.error) {
            setHasError(true);
            return setErrorMessage(resp.message);
        }
    };

    return (
        <div className="container mt-3">
            <ErrorMessage message={errorMessage} visible={hasError} afterTimeout={handleAfterTimeoutError}/>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
