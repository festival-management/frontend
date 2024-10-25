import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

import useUsersApi from "../../api/users";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import ToastManager from "../../components/toast-manager.tsx";
import ProfileEditPasswordForm from "./ProfileEditPasswordForm";
import ToastMessage, {ToastType} from "../../models/toast-message.model.ts";

export default function RouteProfile() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const usersApi = useUsersApi();

    const addToast = (errorCode: number, type: ToastType) => {
        setToasts((prevToasts) => [{ errorCode, type }, ...prevToasts]);
    };

    const removeToast = (index: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const {data} = useQuery({
        queryKey: ["profile"],
        queryFn: () => usersApi.getUserById(),
        enabled: true,
        staleTime: 0,
    });
    const updateUserPasswordMutation = useMutation({
        mutationFn: usersApi.updateUserPassword,
        onSuccess: async (data) => {
            if (data.error) {
                return addToast(data.code, "error");
            }

            addToast(ErrorCodes.SUCCESS, "success");
        }
    });

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmitChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserPasswordMutation.mutate(password);
    }

    useEffect(() => {
        if (data) {
            if (data.error) {
                return addToast(data.code, "error");
            }

            setUserName(data.username!);
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        Username: {userName}
                    </div>
                    <hr/>
                    <ProfileEditPasswordForm password={password} handlePasswordChange={handlePasswordChange}
                                             handleSubmit={handleSubmitChangePassword}/>
                </div>
            </div>
            <ToastManager toasts={toasts} removeToast={removeToast}/>
        </div>
    );
}