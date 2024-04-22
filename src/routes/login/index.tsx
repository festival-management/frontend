import React, {useState} from 'react';

import LoginForm from "./LoginForm";
import useAuthApi from "../../api/auth";
import ErrorMessage from "../../components/error-message";

export default function RouteLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const authApi = useAuthApi();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resp = await authApi.login(username, password);

        if (resp.error)
            return setMessage(resp.message);
    };

    return (
        <div className="container mt-3">
            <ErrorMessage message={message}/>
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
