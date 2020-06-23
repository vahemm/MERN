import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../component/Loader";
import {LinkList} from "../component/LinkList";

export const LinkesPage = ()=>{
    const [link, setLink] = useState([]);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);

    const fechedLinks = useCallback(async ()=>{
        try {
            const getObject = await request("api/link", "GET" , null, {authorization: `Bearer ${token}`});

            setLink(getObject)
        } catch (e) {

        }
    },[request, token]);

    useEffect(()=>{
        fechedLinks()
    },[fechedLinks])

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinkList link={link}/>}
        </>
    )
};