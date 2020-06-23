import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom"


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState("");

    useEffect(() => {
        window.M.updateTextFields()
    }, []);
    const pressHendler = async event => {
        if (event.key === "Enter") {
            try {
                const data = await request("api/link/generate", "POST", {from: link}, {authorization: `Bearer ${auth.token}`})
                console.log(data)
                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
                    <div className="input-field">
                        <input placeholder="write link"
                               id="link"
                               type="text"
                               name="email"
                               value={link}
                               onChange={e => {
                                   setLink(e.target.value)
                               }}
                               onKeyPress={pressHendler}
                        />
                        <label style={{fontSize: 25}} htmlFor="email">write link</label>
                    </div>
                </div>
            </div>
        </div>
    )
};