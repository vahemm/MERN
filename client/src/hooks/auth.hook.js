import {useCallback, useEffect, useState} from "react";

const storageName = "userData"

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false)
    const [userID, setUserID] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserID(id);
        localStorage.setItem(storageName, JSON.stringify({
            userID: id, token: jwtToken
        }))
    }, []);

    const logout = useCallback(() => {
        setUserID(null);
        setToken(null);
        localStorage.removeItem(storageName)
    }, []);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.userID) {
            login(data.token, data.userID)

        }
        setReady(true)
    }, [login]);


    return {login, logout, token, userID, ready}
}