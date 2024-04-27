import React from "react";

type UserEditPasswordFormProps = {
    password: string;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function UserEditPasswordForm({
                                                 password,
                                                 handlePasswordChange,
                                                 handleSubmit
                                             }: UserEditPasswordFormProps) {
    return (
        <>
            <h6>Change password</h6>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="formInputUserPassword"
                        placeholder="Input the new password of user"
                        value={password}
                        onChange={handlePasswordChange}
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