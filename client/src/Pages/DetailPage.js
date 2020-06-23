import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hooks";
import {useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../component/Loader";
import {LinkCard} from "../component/LinkCard";

export const DetailPage = () => {
    const [link, setLink] = useState(null);
    const {request, loading} = useHttp();
    const linkID = useParams().id;
    const {token} = useContext(AuthContext)

    const getLink = useCallback(async () => {
        try {
            const linkObject = await request(`/api/link/${linkID}`, "GET", null, {
                authorization: `Bearer ${token}`
            });

            setLink(linkObject)

        } catch (e) {
        }
    }, [request, linkID, token, setLink])

    useEffect(() => {
        getLink()
    }, [getLink]);

    if (loading) {
        return <Loader/>
    };

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
};