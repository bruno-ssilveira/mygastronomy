import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function authServices() {
    const [authLoading, setAuthLoading] = useState(false)
    const navigate = useNavigate()

    const url = 'https://mygastronomy-6gwt.onrender.com/auth'

    const login = (formData) => {
        setAuthLoading(true)

        fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success && result.body.token) {
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ token: result.body.token, user: result.body.user })
                )
            }
        })
        .catch((error) => {

        })
        .finally(() => {
            setAuthLoading(false)
            const authData = JSON.parse(localStorage.getItem('auth'))
            if(authData) {
                return navigate('/profile')
            }
        })
    }

    const logout = () => {
        localStorage.removeItem('auth')        
    }

    const signup = (formData) => {
        setAuthLoading(true)

        fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success && result.body.token) {
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ token: result.body.token, user: result.body.user })
                )
            }
        })
        .catch((error) => {

        })
        .finally(() => {
            setAuthLoading(false)
        })        
    }

    return { login, logout, signup, authLoading }
}
