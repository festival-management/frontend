import {useQuery} from "@tanstack/react-query";

import {GetUserResponse, GetUsersResponse, UseUsersApiInterface} from "../../models/users.model.ts";

const useUserQueries = (usersApi: UseUsersApiInterface) => {
    const fetchUserDetails = (id: number): GetUserResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["users-details", id],
            queryFn: () => usersApi.getUserById(id),
            enabled: !!id,
            staleTime: 0,
        });

        return data;
    };

    const fetchUsersData = (page: number): GetUsersResponse | undefined => {
        const {data} = useQuery({
            queryKey: ["users", page],
            queryFn: () => usersApi.getUsers(page),
            enabled: true,
            staleTime: 0,
        });

        return data;
    };

    return {fetchUserDetails, fetchUsersData};
};

export default useUserQueries;
