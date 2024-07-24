import React, {useState} from 'react';
import {useMutation} from "@tanstack/react-query";

import LoginForm from "./LoginForm";
import useAuthApi from "../../api/auth";
import {LoginResponse} from "../../models/auth.model.ts";
import ToastManager from "../../components/toast-manager.tsx";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";

export default function RouteLogin() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authApi = useAuthApi();

    const addToast = (errorCode: number, type: ToastType) => {
        setToasts((prevToasts) => [{ errorCode, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const loginMutation = useMutation({
        mutationFn: (variables: {
            username: string,
            password: string
        }) => authApi.login(variables.username, variables.password),
        onSuccess: async (data: LoginResponse) => {
            if (data.error) {
                addToast(data.code, "error");
            }
        }
    });

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
        <div className="container mt-3">
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
            />
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}
