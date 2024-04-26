import React from "react";

type ProfileEditPasswordFormProps = {
    password: string;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProfileEditPasswordForm({
                                                    password,
                                                    handlePasswordChange,
                                                    handleSubmit
                                                }: ProfileEditPasswordFormProps) {
    return (
        <>
            <h6>Change password</h6>
            <form onSubmit={handleSubmit}>
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