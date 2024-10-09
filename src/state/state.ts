import { Prisma } from "@prisma/client";
import axios from "axios";
import { atom, selector } from "recoil";
import type { user } from "@prisma/client";

type UserTypeForState = Pick<user, "username" | "email" | "isAcceptingMessage" | "isVerified" | "id">

export const userAuthState = atom({
    key: 'userState',
    default: {
        // isLoading: true,
        // isError: false,
        user: {
            username: "",
            email: "",
            isAcceptingMessage: false,
            isVerified: true,
            id: "",
        }
    }
})

export const currentUser = selector<UserTypeForState | null>({
    key: 'currentUser',
    get: async ({ get }) => {

        try {
            const res = await axios.get('/api/get-current-user-details')

            const userFromServer: UserTypeForState = res.data.user;

            console.log(userFromServer)
            if (!res.data) {
                return null;
            }
            return userFromServer;

        } catch (error) {
            console.log("error while getting current logged in user from the db: ", error)
            return null;
        }
    }
})