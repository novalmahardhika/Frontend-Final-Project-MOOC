import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const _token = localStorage.getItem("token");
        if (_token) {
            setIsAuth(true);
            setToken(_token);
        }
    }, []);

    async function login(payload) {
        try {
            const res = await axios.post("http://localhost/login", payload);
            const token = res.data.data.token;

            localStorage.setItem("token", token);
            setToken(token);
            setIsAuth(true);
        } catch (err) {
            console.error(err.message);
            setIsAuth(false);
            throw (err);
        }
    }

    async function logout() {
        localStorage.removeItem("token");
        setIsAuth(false);
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ isAuth, token, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};