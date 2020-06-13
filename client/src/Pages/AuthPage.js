import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
    const {request, loading, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    const message = useMessage()

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])
    const changeHendler = event => {

        setForm({...form, [event.target.name]: event.target.value})
    };

    const registrationHendler = async () => {
        try {
            const data = await request("/api/auth/registration","POST", {...form} )
            console.log("data", data)
            message(data.message)
        } catch (e) {

        }
    }
    const loginHendler = async () => {
        try {
            const data = await request("/api/auth/login","POST", {...form} )
            console.log("data", data)
            message(data.message)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten Links</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="writh email"
                                       id="email"
                                       type="text"
                                       name="email"
                                       onChange={changeHendler}
                                />
                                <label style={{fontSize: 25}} htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="writh password"
                                       id="password"
                                       type="password"
                                       name="password"
                                       onChange={changeHendler}
                                />
                                <label style={{fontSize: 25}} htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <div>
                            <button className="waves-effect waves-light btn "
                                    style={{marginRight: 10}}
                                    disabled={loading}
                                    onClick={loginHendler}
                            >
                                Login
                            </button>
                            <button onClick={registrationHendler}
                                    className="waves-effect waves-light btn"
                                    disabled={loading}
                            >
                                Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};