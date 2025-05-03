import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "./Authentication";

export default function PrivateRoute({ children }) {

    // const [user, setuser] = useState(null);

    const [loading, setLoading] = useState(true);

const [isAuthenticated , setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkSesions = async () => {
            const { data , error } = await supabase.auth.getSession()
            // setuser(user);
            setIsAuthenticated(!!data.session)
            setLoading(false)
        }

        checkSesions();

    }, [])

    if (loading) return <p>Loading...</p>

    return isAuthenticated  ? children : <Navigate to="/signUp" replace />

}
