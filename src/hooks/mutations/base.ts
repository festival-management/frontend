import BaseResponse from "../../models/base.model.ts";
import {ErrorCodes} from "../../errors/ErrorCodes.ts";
import {ToastType} from "../../models/toast-message.model.ts";

export const baseMutation = (addToast: (errorCode: number, type: ToastType) => void) => {
    const onSuccessMutation = async (data: BaseResponse) => {
        if (data.error) {
            return addToast(data.code, "error");
        }
        addToast(ErrorCodes.SUCCESS, "success");
    };

    return {onSuccessMutation};
};
