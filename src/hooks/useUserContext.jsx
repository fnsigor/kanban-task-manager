import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export function useUserContext() {
    const { user, setUser } = useContext(UserContext)

    return user, setUser
}