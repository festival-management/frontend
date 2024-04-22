import React from "react";

type LoginFormProps = {
    username: string;
    password: string;
    handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({
                                      username,
                                      password,
                                      handleUsernameChange,
                                      handlePasswordChange,
                                      handleSubmit
                                  }: LoginFormProps) {
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
                    required
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
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
}
