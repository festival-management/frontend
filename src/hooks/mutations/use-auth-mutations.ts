import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {UseAuthApiInterface} from "../../models/auth.model.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";

const useAuthMutations = (authApi: UseAuthApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    const addUserMutation = useMutation({
        mutationFn: (variables: {
            username: string,
            password: string,
            roleId: number
        }) => authApi.register(variables.username, variables.password, variables.roleId),
        onSuccess: onSuccessMutation
    });

    return {addUserMutation};
};

export default useAuthMutations;
