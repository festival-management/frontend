import {useMutation} from "@tanstack/react-query";

import {baseMutation} from "./base.ts";
import {useToastContext} from "../../contexts/ToastContext.tsx";
import {Settings, UseSettingsApiInterface} from "../../models/settings.ts";

const useSettingMutations = (settingsApi: UseSettingsApiInterface) => {
    const {addToast} = useToastContext();
    const {onSuccessMutation} = baseMutation(addToast);

    // Updates
    const updateSettingsMutation = useMutation({
        mutationFn: (variables: { settings: Settings }) => settingsApi.updateSettings(variables.settings),
        onSuccess: onSuccessMutation
    });

    return {updateSettingsMutation};
};

export default useSettingMutations;
