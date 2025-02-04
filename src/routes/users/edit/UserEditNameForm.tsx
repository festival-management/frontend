import React, {useEffect, useState} from "react";

import {UseUsersApiInterface} from "../../../models/users.model.ts";
import useUserMutations from "../../../hooks/mutations/use-user-mutations.ts";

type UserEditNameFormProps = {
    usersApi: UseUsersApiInterface;
    userId: number;
    userName: string;
}

export default function UserEditNameForm({usersApi, userId, userName}: UserEditNameFormProps) {
    const [newUserName, setNewUserName] = useState(userName);

    const {updateUserNameMutation} = useUserMutations(usersApi);

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(event.target.value);
    };

    const handleSubmitChangeNewUserName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserNameMutation.mutate({id: userId, name: newUserName});
    };

    useEffect(() => {
        setNewUserName(userName);
    }, [userName]);

    return (
        <>
            <h6>Change username</h6>
            <form onSubmit={handleSubmitChangeNewUserName}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="formInputUserName"
                        placeholder="Input the new name of user"
                        value={newUserName}
                        onChange={handleUserNameChange}
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