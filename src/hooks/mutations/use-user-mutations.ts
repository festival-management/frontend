import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {UseUsersApiInterface} from "../../models/users.model.ts";

const useUserMutations = (usersApi: UseUsersApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Updates
    const updateUserNameMutation = useMutation({
        mutationFn: (variables: { id: number, name: string }) => usersApi.updateUserName(variables.id, variables.name),
        onSuccess: onSuccessMutation
    });
    const updateUserPasswordMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            password: string
        }) => usersApi.updateUserPassword(variables.password, variables.id),
        onSuccess: onSuccessMutation
    });
    const updateUserRoleIdMutation = useMutation({
        mutationFn: (variables: {
            id: number,
            roleId: number
        }) => usersApi.updateUserRoleId(variables.id, variables.roleId),
        onSuccess: onSuccessMutation
    });

    // Delete
    const deleteUserMutation = useMutation({
        mutationFn: usersApi.deleteUser,
        onSuccess: onSuccessMutation
    });

    return {updateUserNameMutation, updateUserPasswordMutation, updateUserRoleIdMutation, deleteUserMutation};
};

export default useUserMutations;
