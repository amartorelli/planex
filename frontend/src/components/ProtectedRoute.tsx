import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { ReactNode, useState, useEffect } from "react";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

function ProtectedRoute({ children }: Props) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | 'loading'>('loading'); // Initial state set to 'loading'

    useEffect(() => {
        auth().catch(() => {
            setIsAuthorized(false)
        })
    })

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/token_refresh/", { refresh: refreshToken })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)

        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === 'loading') {
        return <div>Loading...</div>
    }

    if (!isAuthorized) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute