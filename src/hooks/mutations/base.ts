import {QueryClient} from "@tanstack/react-query";

import BaseResponse from "../../models/base.model.ts";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {ToastType} from "../../models/toast-message.model.ts";

export const baseMutation = (
    addToast: (errorCode: number, type: ToastType) => void,
    queryClient?: QueryClient,
    queryKeyPrefix?: string
) => {
    const onSuccessMutation = async (data: BaseResponse, removeQueries?: boolean) => {
        if (data.error) {
            return addToast(data.code, "error");
        }
        addToast(ErrorCodes.SUCCESS, "success");

        if (removeQueries && queryClient && queryKeyPrefix) {
            await queryClient.invalidateQueries({
                predicate: (query) => Boolean(query.queryKey[0]?.toString().startsWith(queryKeyPrefix)),
            });
        }
    };

    return {onSuccessMutation};
};
