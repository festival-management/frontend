import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";

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
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setIsSaved(true);
        }
    });

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

    const handleSubmitChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserPasswordMutation.mutate(password);
    }

    useEffect(() => {
        if (data) {
            if (data.error) {
                setHasError(true);
                return setErrorMessage(data.message);
            }

            setUserName(data.username!);
        }
    }, [data]);

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