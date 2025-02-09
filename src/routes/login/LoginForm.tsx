import React, {useState} from "react";

import useAuthApi from "../../api/auth.ts";
import useAuthMutations from "../../hooks/mutations/use-auth-mutations.ts";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authApi = useAuthApi();

    const {loginMutation} = useAuthMutations(authApi);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        loginMutation.mutate({username, password});
    };

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
