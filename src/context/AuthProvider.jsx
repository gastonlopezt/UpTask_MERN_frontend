import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)


    // Navigate para no volver a iniciar sesión cuando ya estas registrado
    const navigate = useNavigate()


    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token){
                setCargando(false)
                return
            } 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                //Al USER registrado lo manda directo a proyectos para no tener que 
                //volver a logearse
                if(data.id && location.pathname === '/') {
                    navigate('/proyectos')
                }
            } catch (error) {
                setAuth(data)
            } 
            setCargando(false)

        }
        autenticarUsuario();
    },[])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;