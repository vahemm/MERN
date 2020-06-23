import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        try {
            setLoading(true);

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json;charset=utf-8';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Something is wrong")
            }
            setLoading(false)
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e.message;

        }
    }, [])
    const clearError = useCallback(() => {
        setError(null)
    }, [])
    return {request, loading, error, clearError}
}