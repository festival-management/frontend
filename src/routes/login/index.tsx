import React, {useState} from 'react';

import ErrorMessage from "../../components/error-message";

type LoginFormProps = {
    username: string;
    password: string;
    handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function LoginForm({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }: LoginFormProps) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="formInputUsername" className="form-label">
                    Username:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="formInputUsername"
                    placeholder="Input your username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="formInputPassword" className="form-label">
                    Password:
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="formInputPassword"
                    placeholder="Input your password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
}

export default function RouteLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: to finish
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
