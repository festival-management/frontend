import React, {useState} from 'react';
import {useMutation} from "@tanstack/react-query";

import LoginForm from "./LoginForm";
import useAuthApi from "../../api/auth";
import ErrorMessage from "../../components/error-message";

export default function RouteLogin() {
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authApi = useAuthApi();

    const loginMutation = useMutation({
        mutationFn: (variables: {
            username: string,
            password: string
        }) => authApi.login(variables.username, variables.password),
        onSuccess: async (data) => {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }
        }
    });

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

        loginMutation.mutate({username, password});
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
}
