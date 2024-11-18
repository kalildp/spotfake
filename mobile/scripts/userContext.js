import { useRouter } from "expo-router";
import { createContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({children}) => {
    const route = useRouter()
    const [userInfo, setUserInfo] = useState({
        nome:'',
        email:'',
        foto:'../assets/images/user.png'
    });

    const pegarUsuario = async (email) => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/${email}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const dados = await response.json()
            {dados.foto? 
                setUserInfo({...userInfo, email: dados.email,nome: dados.nome, foto: dados.foto}): 
            setUserInfo({...userInfo, email: dados.email,nome: dados.nome})
        }
        } catch (erro) {
            return;
        }
    }

    const handleDisconnect = () => {
        route.push('/')
        setUserInfo({
            nome:'',
            email:'',
            foto:'../assets/images/user.png'
        })
    };

    return(
        <UserContext.Provider value={{userInfo, setUserInfo, handleDisconnect, pegarUsuario}}>
            {children}
        </UserContext.Provider>
    )
}