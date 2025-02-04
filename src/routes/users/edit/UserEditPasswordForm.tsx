import React, {useState} from "react";

import {UseUsersApiInterface} from "../../../models/users.model.ts";
import useUserMutations from "../../../hooks/mutations/use-user-mutations.ts";

type UserEditPasswordFormProps = {
    usersApi: UseUsersApiInterface;
    userId: number;
}

export default function UserEditPasswordForm({usersApi, userId}: UserEditPasswordFormProps) {
    const [newUserPassword, setNewUserPassword] = useState("");

    const {updateUserPasswordMutation} = useUserMutations(usersApi);

    const handleUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserPassword(event.target.value);
    };

    const handleSubmitChangeNewUserPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserPasswordMutation.mutate({id: userId, password: newUserPassword});
    };

    return (
        <>
            <h6>Change password</h6>
            <form onSubmit={handleSubmitChangeNewUserPassword}>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="formInputUserPassword"
                        placeholder="Input the new password of user"
                        value={newUserPassword}
                        onChange={handleUserPasswordChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Change
                </button>
            </form>
            <hr/>
        </>
    );
}