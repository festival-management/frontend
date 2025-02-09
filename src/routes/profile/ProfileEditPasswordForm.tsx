import React, {useState} from "react";

import {UseUsersApiInterface} from "../../models/users.model.ts";
import useUserMutations from "../../hooks/mutations/use-user-mutations.ts";

type ProfileEditPasswordFormProps = {
    usersApi: UseUsersApiInterface;
}

export default function ProfileEditPasswordForm({usersApi}: ProfileEditPasswordFormProps) {
    const [password, setPassword] = useState("");

    const {updateUserPasswordMutation} = useUserMutations(usersApi);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmitChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserPasswordMutation.mutate({password});
    }

    return (
        <>
            <h6>Change password</h6>
            <form onSubmit={handleSubmitChangePassword}>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="formInputPassword"
                        placeholder="Input the new password of role"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
        </>
    );
}